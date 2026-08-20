<template>
  <span class="content-badge" :class="`type-${type}`">
    <span class="dot" aria-hidden="true" />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{ type: 'article' | 'thought' | 'ask' }>()

const labels: Record<string, string> = { article: '文章', thought: '想法', ask: '问答' }
const label = labels[props.type]
</script>

<style scoped>
.content-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--sub);
  user-select: none;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--badge-article);
  box-shadow: 0 0 6px currentColor;
}

.type-article .dot {
  background: var(--badge-article);
  color: var(--badge-article);
}

.type-thought .dot {
  background: var(--badge-thought);
  color: var(--badge-thought);
}

.type-ask .dot {
  background: var(--badge-ask);
  color: var(--badge-ask);
}
</style>
