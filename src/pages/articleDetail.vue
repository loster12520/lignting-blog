<template>
  <div v-if="article" class="article-page">
    <ReadingProgress />

    <div class="page article-inner">
      <router-link to="/articles" class="back-link">← 返回文章列表</router-link>

      <header class="article-head">
        <ContentBadge type="article" />
        <h1 class="article-title serif">{{ article.title }}</h1>
        <div class="article-meta">
          <span class="meta-item">{{ article.author }}</span>
          <span class="meta-sep" aria-hidden="true">·</span>
          <span class="meta-item mono">{{ article.date || '未标注日期' }}</span>
          <span class="meta-sep" aria-hidden="true">·</span>
          <span class="meta-item">约 {{ article.readingMinutes }} 分钟</span>
        </div>
        <div v-if="article.tags?.length" class="article-tags">
          <TagChip v-for="t in article.tags" :key="t" :tag="t" />
        </div>
      </header>

      <div class="article-layout">
        <article class="markdown-body article-content" v-html="rendered.html" />

        <aside v-if="rendered.headings.length >= 2" class="article-toc">
          <TocSidebar :headings="rendered.headings" />
        </aside>
      </div>

      <nav v-if="prev || next" class="article-nav" aria-label="文章导航">
        <router-link v-if="prev" :to="`/articles/${prev.slug}`" class="nav-item prev">
          <span class="nav-label">← 上一篇</span>
          <span class="nav-title serif">{{ prev.title }}</span>
        </router-link>
        <span v-else class="nav-item placeholder" />
        <router-link v-if="next" :to="`/articles/${next.slug}`" class="nav-item next">
          <span class="nav-label">下一篇 →</span>
          <span class="nav-title serif">{{ next.title }}</span>
        </router-link>
        <span v-else class="nav-item placeholder" />
      </nav>
    </div>
  </div>

  <div v-else class="page">
    <p class="empty">没有找到这篇文章。</p>
    <p class="empty">
      <router-link to="/articles">← 返回文章列表</router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useContentStore } from '../stores/content'
import { renderMarkdown } from '../utils/markdown'
import ReadingProgress from '../components/ReadingProgress.vue'
import TocSidebar from '../components/TocSidebar.vue'
import ContentBadge from '../components/ContentBadge.vue'
import TagChip from '../components/TagChip.vue'

const route = useRoute()
const store = useContentStore()

const article = computed(() => store.articleBySlug(String(route.params.slug)))

const rendered = computed(() =>
  article.value ? renderMarkdown(article.value.content) : { html: '', headings: [] },
)

const idx = computed(() => {
  if (!article.value) return -1
  return store.articles.findIndex((a) => a.slug === article.value?.slug)
})

const prev = computed(() =>
  idx.value > 0 ? store.articles[idx.value - 1] : undefined,
)

const next = computed(() =>
  idx.value >= 0 && idx.value < store.articles.length - 1
    ? store.articles[idx.value + 1]
    : undefined,
)
</script>

<style scoped>
.article-inner {
  width: min(1120px, calc(100% - 40px));
}

.back-link {
  display: inline-block;
  font-size: 14px;
  color: var(--sub);
  margin-bottom: 28px;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--accent-text);
}

.article-head {
  margin-bottom: 40px;
}

.article-title {
  margin: 12px 0 14px;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.02em;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  color: var(--sub);
  font-size: 14px;
}

.meta-sep {
  opacity: 0.6;
}

.meta-item.mono {
  font-size: 13px;
}

.article-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 16px;
}

.article-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: 48px;
  align-items: start;
}

.article-content {
  min-width: 0;
  max-width: 760px;
}

.article-toc {
  position: sticky;
  top: calc(var(--header-h) + 20px);
}

.article-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 64px;
  padding-top: 32px;
  border-top: 1px solid var(--line);
}

.nav-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px 20px;
  border-radius: var(--radius);
  border: 1px solid var(--line);
  background: var(--surface);
  transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.nav-item:hover {
  text-decoration: none;
  border-color: color-mix(in srgb, var(--accent) 55%, var(--line));
  box-shadow: var(--shadow-glow);
  transform: translateY(-1px);
}

.nav-item.next {
  text-align: right;
}

.nav-item.placeholder {
  visibility: hidden;
  border-style: dashed;
}

.nav-label {
  font-size: 12.5px;
  color: var(--sub);
  letter-spacing: 0.05em;
}

.nav-title {
  font-size: 15.5px;
  font-weight: 600;
  line-height: 1.5;
}

@media (max-width: 1280px) {
  .article-layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .article-toc {
    display: none;
  }
}

@media (max-width: 640px) {
  .article-nav {
    grid-template-columns: 1fr;
  }
}
</style>
