<template>
  <div class="page">
    <header class="page-head">
      <h1 class="page-title">关于</h1>
    </header>

    <section class="profile">
      <div class="avatar" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor"
          stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </div>
      <h2 class="profile-name serif">lignting · 聆听</h2>
      <p class="profile-bio">
        这里是聆听的私人博客，一个文章储存库，也是灵感存档的地方。
        文章、想法、问答都会在这里展示。
      </p>
      <ul class="profile-facts">
        <li><span class="fact-key">内容形态</span><span class="fact-value">文章 · 想法 · 问答</span></li>
        <li><span class="fact-key">主题</span><span class="fact-value">光束 · 火花 · 回响</span></li>
        <li><span class="fact-key">投稿</span><span class="fact-value">欢迎提 issue / PR 挂载文章</span></li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.profile {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow-card);
  padding: 48px 40px;
  text-align: center;
}

.avatar {
  width: 84px;
  height: 84px;
  margin: 0 auto 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  background: var(--surface-2);
  border: 1px solid var(--line);
  box-shadow: 0 0 20px var(--glow);
}

.profile-name {
  margin: 0 0 14px;
  font-size: 1.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.profile-bio {
  max-width: 460px;
  margin: 0 auto;
  color: var(--sub);
  font-size: 15px;
  line-height: 1.9;
}

.profile-facts {
  list-style: none;
  margin: 32px 0 0;
  padding: 0;
  max-width: 460px;
  margin-left: auto;
  margin-right: auto;
  border-top: 1px solid var(--line);
}

.profile-facts li {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 12px 4px;
  border-bottom: 1px solid var(--line);
  font-size: 14px;
}

.fact-key {
  color: var(--sub);
  flex-shrink: 0;
}

.fact-value {
  color: var(--ink);
}

@media (max-width: 640px) {
  .profile {
    padding: 36px 20px;
  }
}
</style>
