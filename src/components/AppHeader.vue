<template>
  <header class="app-header">
    <div class="header-inner">
      <router-link to="/" class="brand">
        <svg class="brand-icon" viewBox="0 0 24 24" width="18" height="18" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          aria-hidden="true">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
        <span class="brand-name">lignting</span>
      </router-link>

      <nav class="nav" aria-label="主导航">
        <router-link
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          :class="{ active: isActive(item.to) }"
        >
          {{ item.name }}
        </router-link>
      </nav>

      <ThemeToggle />
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'

const route = useRoute()

const nav = [
  { name: '首页', to: '/' },
  { name: '文章', to: '/articles' },
  { name: '想法', to: '/thoughts' },
  { name: '问答', to: '/asks' },
  { name: '关于', to: '/about' },
]

function isActive(to: string): boolean {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
}

.header-inner {
  width: min(1100px, calc(100% - 40px));
  margin: 0 auto;
  height: var(--header-h);
  display: flex;
  align-items: center;
  gap: 24px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--ink);
  font-weight: 700;
  letter-spacing: 0.02em;
  font-size: 17px;
  flex-shrink: 0;
}

.brand:hover {
  text-decoration: none;
}

.brand-icon {
  color: var(--accent);
}

.nav {
  display: flex;
  gap: 2px;
  margin-left: auto;
  overflow-x: auto;
  scrollbar-width: none;
}

.nav::-webkit-scrollbar {
  display: none;
}

.nav-link {
  padding: 6px 12px;
  border-radius: 8px;
  color: var(--sub);
  font-size: 15px;
  white-space: nowrap;
  position: relative;
  transition: color 0.2s ease, background 0.2s ease;
}

.nav-link:hover {
  color: var(--ink);
  background: var(--surface-2);
  text-decoration: none;
}

.nav-link.active {
  color: var(--accent-text);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 0;
  height: 2px;
  border-radius: 2px;
  background: var(--accent);
  box-shadow: 0 0 8px var(--glow);
}

@media (max-width: 640px) {
  .header-inner {
    gap: 12px;
  }

  .brand-name {
    display: none;
  }
}
</style>
