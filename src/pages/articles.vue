<template>
  <div class="page">
    <header class="page-head">
      <h1 class="page-title">文章</h1>
      <p class="page-sub">共 {{ filtered.length }} 篇 · 光束，稳定的表达</p>
    </header>

    <div class="tag-filter">
      <button class="filter-chip" :class="{ active: !currentTag }" @click="selectTag('')">
        全部
      </button>
      <button
        v-for="t in store.tags"
        :key="t"
        class="filter-chip"
        :class="{ active: currentTag === t }"
        @click="selectTag(t)"
      >
        # {{ t }}
      </button>
    </div>

    <div v-if="filtered.length" class="article-list">
      <ArticleCard v-for="a in filtered" :key="a.slug" :article="a" />
    </div>
    <p v-else class="empty">这个标签下还没有文章。</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContentStore } from '../stores/content'
import ArticleCard from '../components/ArticleCard.vue'

const store = useContentStore()
const route = useRoute()
const router = useRouter()

const currentTag = computed(() => (typeof route.query.tag === 'string' ? route.query.tag : ''))

const filtered = computed(() =>
  currentTag.value
    ? store.articles.filter((a) => a.tags?.includes(currentTag.value))
    : store.articles,
)

function selectTag(tag: string) {
  router.push(tag ? { path: '/articles', query: { tag } } : { path: '/articles' })
}
</script>

<style scoped>
.tag-filter {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.filter-chip {
  padding: 5px 14px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--sub);
  font-size: 13.5px;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.filter-chip:hover {
  color: var(--accent-text);
  border-color: var(--accent);
}

.filter-chip.active {
  color: var(--accent-text);
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, var(--surface));
  box-shadow: 0 0 10px var(--glow);
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
