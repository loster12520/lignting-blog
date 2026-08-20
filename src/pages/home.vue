<template>
  <div class="page home-page">
    <section class="hero">
      <p class="hero-kicker mono">⚡ lignting</p>
      <h1 class="hero-title serif">聆听 · 灵感存档</h1>
      <p class="hero-tagline">文章是光束 · 想法是火花 · 问答是回响</p>
      <div class="hero-entrances">
        <router-link
          v-for="e in entrances"
          :key="e.type"
          :to="e.to"
          class="entrance"
          :class="`type-${e.type}`"
        >
          <span class="entrance-dot" aria-hidden="true" />
          <span class="entrance-name">{{ e.name }}</span>
          <span class="entrance-desc">{{ e.desc }}</span>
        </router-link>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2 class="section-title serif">最新文章</h2>
        <router-link to="/articles" class="section-more">查看全部 →</router-link>
      </div>
      <div v-if="store.latestArticles.length" class="article-list">
        <ArticleCard v-for="a in store.latestArticles" :key="a.slug" :article="a" />
      </div>
      <p v-else class="empty">还没有文章，等你写下第一篇。</p>
    </section>

    <section class="section">
      <div class="section-head">
        <h2 class="section-title serif">最近想法</h2>
        <router-link to="/thoughts" class="section-more">查看全部 →</router-link>
      </div>
      <div v-if="store.latestThoughts.length" class="thought-list">
        <ThoughtCard v-for="t in store.latestThoughts" :key="t.slug" :thought="t" />
      </div>
      <p v-else class="empty">还没有想法，等一个灵光乍现。</p>
    </section>

    <section class="section">
      <div class="section-head">
        <h2 class="section-title serif">问答</h2>
        <span class="soon-badge">即将上线</span>
      </div>
      <router-link to="/asks" class="ask-placeholder">
        <svg class="ask-icon" viewBox="0 0 24 24" width="22" height="22" fill="none"
          stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
          aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span class="ask-text">问答功能正在路上，数据接口已就绪</span>
        <span class="ask-arrow">→</span>
      </router-link>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useContentStore } from '../stores/content'
import ArticleCard from '../components/ArticleCard.vue'
import ThoughtCard from '../components/ThoughtCard.vue'

const store = useContentStore()

const entrances = [
  { type: 'article' as const, name: '文章', desc: '光束 · 完整的表达', to: '/articles' },
  { type: 'thought' as const, name: '想法', desc: '火花 · 一闪而过的念头', to: '/thoughts' },
  { type: 'ask' as const, name: '问答', desc: '回响 · 一问一答', to: '/asks' },
]
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 72px 0 56px;
}

.hero-kicker {
  margin: 0 0 14px;
  font-size: 14px;
  color: var(--accent-text);
  letter-spacing: 0.3em;
}

.hero-title {
  margin: 0;
  font-size: clamp(2.4rem, 6vw, 3.6rem);
  font-weight: 700;
  letter-spacing: 0.1em;
  line-height: 1.3;
}

.hero-tagline {
  margin: 18px 0 36px;
  color: var(--sub);
  font-size: 16px;
  letter-spacing: 0.12em;
}

.hero-entrances {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}

.entrance {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: var(--radius);
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--ink);
  box-shadow: var(--shadow-card);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.entrance:hover {
  transform: translateY(-2px);
  text-decoration: none;
  border-color: color-mix(in srgb, var(--accent) 55%, var(--line));
  box-shadow: var(--shadow-glow);
}

.entrance-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.type-article .entrance-dot {
  background: var(--badge-article);
  box-shadow: 0 0 8px var(--badge-article);
}

.type-thought .entrance-dot {
  background: var(--badge-thought);
  box-shadow: 0 0 8px var(--badge-thought);
}

.type-ask .entrance-dot {
  background: var(--badge-ask);
  box-shadow: 0 0 8px var(--badge-ask);
}

.entrance-name {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 16px;
}

.entrance-desc {
  color: var(--sub);
  font-size: 13px;
}

.section {
  margin-top: 56px;
}

.section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--line);
}

.section-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.06em;
}

.section-more {
  font-size: 14px;
  color: var(--sub);
  white-space: nowrap;
}

.section-more:hover {
  color: var(--accent-text);
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.thought-list {
  display: flex;
  flex-direction: column;
}

.ask-placeholder {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 24px;
  border-radius: var(--radius);
  border: 1px dashed color-mix(in srgb, var(--badge-ask) 60%, var(--line));
  background: var(--surface);
  color: var(--ink);
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.ask-placeholder:hover {
  text-decoration: none;
  border-color: var(--badge-ask);
  box-shadow: 0 0 16px color-mix(in srgb, var(--badge-ask) 25%, transparent);
}

.ask-icon {
  color: var(--badge-ask);
  flex-shrink: 0;
}

.ask-text {
  flex: 1;
  color: var(--sub);
  font-size: 15px;
}

.ask-arrow {
  color: var(--badge-ask);
}

@media (max-width: 640px) {
  .hero {
    padding: 48px 0 40px;
  }
}
</style>
