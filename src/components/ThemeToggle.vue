<template>
  <button class="theme-toggle" type="button" :title="dark ? '切换到日间' : '切换到夜间'"
    :aria-label="dark ? '切换到日间模式' : '切换到夜间模式'" @click="toggle">
    <svg v-if="dark" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
    <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const dark = ref(false)

onMounted(() => {
  dark.value = document.documentElement.dataset.theme === 'dark'
})

function apply(d: boolean) {
  dark.value = d
  document.documentElement.dataset.theme = d ? 'dark' : 'light'
  try {
    localStorage.setItem('theme', d ? 'dark' : 'light')
  } catch {
    /* ignore */
  }
}

function toggle() {
  apply(!dark.value)
}
</script>

<style scoped>
.theme-toggle {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--sub);
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.theme-toggle:hover {
  color: var(--accent);
  border-color: var(--accent);
  box-shadow: 0 0 10px var(--glow);
}
</style>
