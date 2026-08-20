<template>
  <div class="page">
    <header class="page-head">
      <h1 class="page-title">问答</h1>
      <span class="soon-badge">即将上线</span>
    </header>

    <section class="placeholder">
      <svg class="placeholder-icon" viewBox="0 0 24 24" width="40" height="40" fill="none"
        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
        aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 9h8M8 13h5" />
      </svg>
      <h2 class="placeholder-title serif">问答功能即将上线</h2>
      <p class="placeholder-desc">
        文章与想法已经就绪。问答的目录（<code class="mono">resources/asks</code>）、数据结构和加载接口已预留，
        将在后续版本接入展示。
      </p>
      <div class="placeholder-actions">
        <router-link to="/articles" class="action-link">→ 去文章看看</router-link>
        <router-link to="/thoughts" class="action-link">→ 去想法看看</router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-head {
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.placeholder {
  text-align: center;
  padding: 72px 24px;
  border-radius: var(--radius);
  border: 1px dashed color-mix(in srgb, var(--badge-ask) 60%, var(--line));
  background: var(--surface);
}

.placeholder-icon {
  color: var(--badge-ask);
  margin-bottom: 20px;
}

.placeholder-title {
  margin: 0 0 14px;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.placeholder-desc {
  max-width: 460px;
  margin: 0 auto;
  color: var(--sub);
  font-size: 14.5px;
  line-height: 1.8;
}

.placeholder-desc code {
  font-size: 12.5px;
  background: var(--surface-2);
  padding: 2px 8px;
  border-radius: 6px;
  border: 1px solid var(--line);
}

.placeholder-actions {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  margin-top: 28px;
}

.action-link {
  font-size: 14.5px;
  color: var(--accent-text);
  transition: letter-spacing 0.2s ease;
}

.action-link:hover {
  letter-spacing: 0.04em;
}
</style>
