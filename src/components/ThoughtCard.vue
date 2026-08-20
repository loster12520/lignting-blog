<template>
  <article class="thought-card">
    <time class="thought-date mono" :datetime="thought.date" :title="thought.date || ''">
      {{ shortDate }}
    </time>
    <div class="thought-main">
      <div class="thought-body markdown-body" v-html="html" />
      <div v-if="thought.tags?.length" class="thought-tags">
        <span v-for="t in thought.tags" :key="t" class="thought-tag"># {{ t }}</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Thought } from '../types/content'
import { renderMarkdown } from '../utils/markdown'

const props = defineProps<{ thought: Thought }>()

const html = computed(() => renderMarkdown(props.thought.content).html)
const shortDate = computed(() => props.thought.date?.slice(5) ?? '')
</script>

<style scoped>
.thought-card {
  display: flex;
  gap: 20px;
  padding: 18px 0;
  border-bottom: 1px dashed var(--line);
  position: relative;
}

.thought-card::before {
  content: '';
  position: absolute;
  left: -8px;
  top: 24px;
  bottom: 24px;
  width: 3px;
  border-radius: 3px;
  background: transparent;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.thought-card:hover::before {
  background: var(--accent);
  box-shadow: 0 0 10px var(--glow);
}

.thought-date {
  flex-shrink: 0;
  width: 52px;
  padding-top: 4px;
  font-size: 13.5px;
  color: var(--accent-text);
  letter-spacing: 0.04em;
}

.thought-main {
  flex: 1;
  min-width: 0;
}

.thought-body {
  font-size: 15px;
  line-height: 1.8;
}

.thought-body :deep(p) {
  margin: 0.4em 0;
}

.thought-body :deep(p:first-child) {
  margin-top: 0;
}

.thought-body :deep(ul),
.thought-body :deep(ol) {
  margin: 0.6em 0;
}

.thought-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.thought-tag {
  font-size: 12px;
  color: var(--sub);
}

@media (max-width: 640px) {
  .thought-card {
    flex-direction: column;
    gap: 6px;
  }

  .thought-date {
    width: auto;
  }
}
</style>
