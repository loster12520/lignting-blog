<template>
  <router-link class="tag-chip" :to="{ path: '/articles', query: { tag } }"># {{ tag }}</router-link>
</template>

<script setup lang="ts">
defineProps<{ tag: string }>()
</script>

<style scoped>
.tag-chip {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--line);
  color: var(--sub);
  font-size: 12.5px;
  line-height: 1.6;
  transition: color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.tag-chip:hover {
  color: var(--accent-text);
  border-color: var(--accent);
  box-shadow: 0 0 8px var(--glow);
  text-decoration: none;
}
</style>
