<template>
  <article class="article-card">
    <router-link class="card-link" :to="`/articles/${article.slug}`">
      <div class="card-meta">
        <ContentBadge type="article" />
        <span class="meta-item mono">{{ article.date || '未标注日期' }}</span>
        <span class="meta-item">{{ article.author }}</span>
        <span class="meta-item">约 {{ article.readingMinutes }} 分钟</span>
      </div>
      <h2 class="card-title serif">{{ article.title }}</h2>
      <p class="card-desc">{{ summary }}</p>
    </router-link>
    <div v-if="article.tags?.length" class="card-tags">
      <TagChip v-for="t in article.tags" :key="t" :tag="t" />
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Article } from '../types/content'
import ContentBadge from './ContentBadge.vue'
import TagChip from './TagChip.vue'

const props = defineProps<{ article: Article }>()

const summary = computed(() => {
  if (props.article.description) return props.article.description
  const text = props.article.content
    .replace(/\n+/g, ' ')
    .replace(/[#*`>\[\]()!\-]/g, '')
    .trim()
  return text.length > 110 ? text.slice(0, 110) + '…' : text
})
</script>

<style scoped>
.article-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 20px 24px;
  box-shadow: var(--shadow-card);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.article-card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--accent) 55%, var(--line));
  box-shadow: var(--shadow-glow);
}

.card-link {
  display: block;
  color: inherit;
}

.card-link:hover {
  text-decoration: none;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.meta-item {
  font-size: 13px;
  color: var(--sub);
}

.meta-item.mono {
  font-size: 12.5px;
}

.card-title {
  margin: 0 0 6px;
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.45;
  transition: color 0.2s ease;
}

.article-card:hover .card-title {
  color: var(--accent-text);
}

.card-desc {
  margin: 0;
  color: var(--sub);
  font-size: 14.5px;
  line-height: 1.7;
}

.card-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 14px;
}
</style>
