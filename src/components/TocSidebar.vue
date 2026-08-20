<template>
  <nav v-if="headings.length >= 2" class="toc" aria-label="目录">
    <p class="toc-title">目录</p>
    <a
      v-for="h in headings"
      :key="h.id"
      :href="`#${h.id}`"
      class="toc-link"
      :class="[`level-${h.depth}`, { active: activeId === h.id }]"
    >
      {{ h.text }}
    </a>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import type { Heading } from '../types/content'

const props = defineProps<{ headings: Heading[] }>()

const activeId = ref('')
let observer: IntersectionObserver | null = null

function observe() {
  observer?.disconnect()
  if (typeof IntersectionObserver === 'undefined') return
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting)
      if (visible.length) activeId.value = visible[0].target.id
    },
    { rootMargin: '-80px 0px -70% 0px' },
  )
  for (const h of props.headings) {
    const el = document.getElementById(h.id)
    if (el) observer.observe(el)
  }
}

watch(() => props.headings, observe)
onMounted(observe)
onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.toc {
  position: sticky;
  top: calc(var(--header-h) + 32px);
  max-height: calc(100vh - var(--header-h) - 64px);
  overflow-y: auto;
  padding-left: 16px;
  border-left: 1px solid var(--line);
  font-size: 13.5px;
}

.toc-title {
  margin: 0 0 10px;
  font-family: var(--font-serif);
  font-size: 14px;
  color: var(--ink);
  letter-spacing: 0.1em;
}

.toc-link {
  display: block;
  padding: 4px 8px;
  margin: 2px -8px;
  border-radius: 6px;
  color: var(--sub);
  line-height: 1.55;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.2s ease, background 0.2s ease;
}

.toc-link:hover {
  color: var(--ink);
  background: var(--surface-2);
  text-decoration: none;
}

.toc-link.active {
  color: var(--accent-text);
  background: var(--surface-2);
}

.toc-link.level-3 {
  padding-left: 20px;
}

.toc-link.level-4,
.toc-link.level-5,
.toc-link.level-6 {
  padding-left: 32px;
}
</style>
