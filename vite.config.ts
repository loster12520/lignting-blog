import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * GitHub Pages SPA 回退：构建结束后把 index.html 复制为 404.html。
 * GitHub Pages 对不存在的路径会返回 404.html，SPA 路由即可接管深链。
 */
function copyIndexTo404(): Plugin {
  let outDir = 'dist'
  return {
    name: 'lignting-copy-index-to-404',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const indexFile = resolve(outDir, 'index.html')
      try {
        const html = readFileSync(indexFile, 'utf-8')
        writeFileSync(resolve(outDir, '404.html'), html)
        console.log('[lignting-blog] 已生成 404.html（GitHub Pages SPA 回退）')
      } catch (err) {
        console.warn('[lignting-blog] 生成 404.html 失败：', err)
      }
    },
  }
}

/**
 * base 路径：
 * - GitHub Actions 构建时取仓库名（如 /lignting-blog/）
 * - 本地开发 / 构建时为 /（用户主页仓库 <用户名>.github.io 也自动是 /）
 */
function resolveBase(): string {
  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
  if (process.env.GITHUB_ACTIONS === 'true' && repoName) {
    return `/${repoName}/`
  }
  return '/'
}

export default defineConfig({
  plugins: [vue(), copyIndexTo404()],
  base: resolveBase(),
})
