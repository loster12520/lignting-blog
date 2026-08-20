import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import Home from '../pages/home.vue'
import Articles from '../pages/articles.vue'
import ArticleDetail from '../pages/articleDetail.vue'
import Thoughts from '../pages/thoughts.vue'
import Asks from '../pages/asks.vue'
import About from '../pages/about.vue'

const router = createRouter({
  // 跟随 vite base（GitHub Pages 子路径 /lignting-blog/ 也能正确工作）
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home, meta: { title: '首页' } },
    { path: '/articles', name: 'articles', component: Articles, meta: { title: '文章' } },
    { path: '/articles/:slug', name: 'article', component: ArticleDetail, meta: { title: '文章' } },
    { path: '/thoughts', name: 'thoughts', component: Thoughts, meta: { title: '想法' } },
    { path: '/asks', name: 'asks', component: Asks, meta: { title: '问答' } },
    { path: '/about', name: 'about', component: About, meta: { title: '关于' } },
  ],
  scrollBehavior(to: RouteLocationNormalized, _from: RouteLocationNormalized, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

const BASE_TITLE = 'lignting · 灵感存档'

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : ''
  document.title = title ? `${title} · ${BASE_TITLE}` : BASE_TITLE
})

export default router
