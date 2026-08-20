import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Article, Ask, BaseDoc, Thought } from '../types/content'
import { parseFrontmatter } from '../utils/frontmatter'
import { readingMinutes } from '../utils/markdown'

// 构建期把 resources 下所有 md 作为原始字符串打进产物 → 纯静态、无运行时请求
const modules = import.meta.glob('../../resources/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function slugOf(path: string): string {
  const base = path.split('/').pop() ?? ''
  return base.replace(/\.md$/, '')
}

function byDateDesc<T extends BaseDoc>(a: T, b: T): number {
  return (b.date || '').localeCompare(a.date || '')
}

export const useContentStore = defineStore('content', () => {
  const articles = ref<Article[]>([])
  const thoughts = ref<Thought[]>([])
  const asks = ref<Ask[]>([])

  function load() {
    const arts: Article[] = []
    const ths: Thought[] = []
    const askList: Ask[] = []

    for (const [path, raw] of Object.entries(modules)) {
      const { data, content } = parseFrontmatter(raw)
      const slug = (typeof data.slug === 'string' && data.slug) || slugOf(path)
      const date = typeof data.date === 'string' ? data.date : undefined
      const tags = Array.isArray(data.tags) ? (data.tags as string[]) : undefined

      if (path.includes('/articles/')) {
        const author =
          (typeof data.author === 'string' && data.author) ||
          (typeof data.arthor === 'string' && data.arthor) ||
          'lignting'
        arts.push({
          slug,
          title: (typeof data.title === 'string' && data.title) || slug,
          author,
          date,
          tags,
          description: typeof data.description === 'string' ? data.description : undefined,
          cover: typeof data.cover === 'string' ? data.cover : undefined,
          readingMinutes: readingMinutes(content),
          content,
        })
      } else if (path.includes('/thoughts/')) {
        ths.push({
          slug,
          title: typeof data.title === 'string' ? data.title : undefined,
          date,
          tags,
          content,
        })
      } else {
        // 问答：v0 仅保留接口（类型 + 加载器），页面暂不渲染
        askList.push({
          slug,
          question: (typeof data.question === 'string' && data.question) || slug,
          answerer:
            (typeof data.answerer === 'string' && data.answerer) ||
            (typeof data['answer-provider'] === 'string' && data['answer-provider']) ||
            'lignting',
          answered: data.answered !== false,
          date,
          tags,
          content,
        })
      }
    }

    articles.value = arts.sort(byDateDesc)
    thoughts.value = ths.sort(byDateDesc)
    asks.value = askList.sort(byDateDesc)
  }

  load()

  const articleBySlug = (slug: string): Article | undefined =>
    articles.value.find((a) => a.slug === slug)

  const tags = computed(() =>
    [...new Set(articles.value.flatMap((a) => a.tags ?? []))].sort((a, b) =>
      a.localeCompare(b, 'zh'),
    ),
  )

  const latestArticles = computed(() => articles.value.slice(0, 3))
  const latestThoughts = computed(() => thoughts.value.slice(0, 5))

  return { articles, thoughts, asks, articleBySlug, tags, latestArticles, latestThoughts }
})
