<template>
  <div class="page">
    <header class="page-head">
      <h1 class="page-title">想法</h1>
      <p class="page-sub">火花，一闪而过 · 共 {{ store.thoughts.length }} 条</p>
    </header>

    <div v-if="store.thoughts.length" class="thought-list">
      <ThoughtCard v-for="t in store.thoughts" :key="t.slug" :thought="t" />
    </div>
    <p v-else class="empty">还没有想法，等一个灵光乍现。</p>
  </div>
</template>

<script setup lang="ts">
import { useContentStore } from '../stores/content'
import ThoughtCard from '../components/ThoughtCard.vue'

const store = useContentStore()
</script>

<style scoped>
.thought-list {
  display: flex;
  flex-direction: column;
}
</style>
