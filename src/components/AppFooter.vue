<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <p class="footer-brand serif">⚡ lignting · 灵感存档</p>
      <p class="footer-slogan">文章是光束 · 想法是火花 · 问答是回响</p>
      <p class="footer-meta">© 2025 lignting · 由 lignting-blog 驱动</p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  border-top: 1px solid var(--line);
  padding: 40px 0 48px;
  margin-top: auto;
}

.footer-inner {
  width: min(960px, calc(100% - 40px));
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.footer-brand {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.footer-slogan {
  margin: 0;
  color: var(--sub);
  font-size: 14px;
}

.footer-meta {
  margin: 8px 0 0;
  color: var(--sub);
  font-size: 12.5px;
  opacity: 0.8;
}
</style>
