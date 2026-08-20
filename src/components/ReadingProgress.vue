<template>
  <div class="reading-progress" aria-hidden="true">
    <div class="bar" :style="{ width: progress + '%' }" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const progress = ref(0)
let ticking = false

function update() {
  ticking = false
  const el = document.documentElement
  const total = el.scrollHeight - el.clientHeight
  progress.value = total > 0 ? Math.min(100, (el.scrollTop / total) * 100) : 0
}

function onScroll() {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(update)
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  update()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.reading-progress {
  position: fixed;
  top: var(--header-h);
  left: 0;
  right: 0;
  height: 3px;
  z-index: 60;
  pointer-events: none;
}

.bar {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 60%, #fff));
  box-shadow: 0 0 8px var(--glow);
  transition: width 0.1s linear;
}
</style>
