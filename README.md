# ⚡ lignting-blog

> 文章是光束 · 想法是火花 · 问答是回响

聆听（Lignting）的私人博客与灵感存档。一个把「完整的文章、一闪而过的想法、认真回答的问题」放在一起的静态个人刊物。

🌐 在线地址：https://loster12520.github.io/lignting-blog/

---

## ✨ 特性

- **三种内容形态**：文章（完整表达）、想法（碎片闪现）、问答（一问一答），各有独立的排版与呈现
- **纯静态**：所有 Markdown 在构建期打包，零运行时请求，可直接部署到任意静态托管
- **双主题**：暖纸（日间）× 深空（夜间），记忆用户选择，无闪烁
- **编辑部式排版**：思源宋体标题 + 完整 Markdown 渲染（代码高亮、表格、引用、目录 TOC、阅读进度条）
- **标签筛选**：文章支持按标签浏览
- **SEO**：路由级页面标题、Open Graph 基础标签

## 📦 三种内容形态

| 类型 | 目录 | 说明 | Frontmatter |
|---|---|---|---|
| 文章 Article | `resources/articles/` | 长文、结构化表达 | `title`（必填）、`author`、`date`、`tags`、`description`、`cover` |
| 想法 Thought | `resources/thoughts/` | 碎片、无需标题、时间线展示 | `date`（必填）、`tags`，`title` 可选 |
| 问答 Ask | `resources/asks/` | 问题 + 回答（v0 仅预留接口） | `question`、`answerer`、`date`、`tags`、`answered` |

> 兼容性：解析器兼容旧示例的 `arthor`（作者）与 `answer-provider`（回答者）拼写。

## 🛠️ 技术栈

- **框架**：Vue 3 + TypeScript + Vite
- **状态/路由**：Pinia + Vue Router
- **渲染**：marked（Markdown）+ highlight.js（代码高亮）
- **包管理**：pnpm

## 🚀 快速开始

```bash
pnpm install     # 安装依赖
pnpm dev         # 启动开发服务器（默认 http://localhost:5173）
pnpm build       # 类型检查 + 生产构建（输出到 dist/）
pnpm preview     # 本地预览生产构建
```

## ✍️ 如何写内容

**新增一篇文章** → 在 `resources/articles/` 新建 `.md` 文件：

```markdown
---
title: 我的第一篇文章
author: lignting
date: 2025-02-01
tags: [前端, 随笔]
description: 一句话摘要
---

正文使用 Markdown 编写……
```

**新增一条想法** → 在 `resources/thoughts/` 新建 `.md` 文件：

```markdown
---
date: 2025-02-01
tags: [随想]
---

一闪而过的念头，无需标题。
```

**新增问答** → 在 `resources/asks/` 新建 `.md` 文件（v1 展示功能接入后自动生效）：

```markdown
---
question: 为什么创建这个博客？
answerer: lignting
date: 2025-02-01
---

回答正文……
```

保存后开发服务器热更新即可预览；`pnpm build` 后内容随静态产物发布。

## 🌐 部署到 GitHub Pages

已配置好 GitHub Actions 自动部署：push 到 `main` 分支即自动构建发布。

```bash
git add .
git commit -m "更新内容"
git push
```

详细步骤与常见问题排查见 [`docs/deploy-github-pages.md`](docs/deploy-github-pages.md)。

## 📁 项目结构

```
├── .github/workflows/deploy.yml   # GitHub Pages 自动部署
├── docs/
│   ├── designs.md                 # 需求说明
│   ├── design-draft.md            # 设计稿
│   └── deploy-github-pages.md     # 部署攻略
├── resources/
│   ├── articles/                  # 文章（Markdown）
│   ├── thoughts/                  # 想法（Markdown）
│   └── asks/                      # 问答（Markdown，v0 仅接口）
├── src/
│   ├── components/                # 基础组件（Header/卡片/TOC/进度条等）
│   ├── pages/                     # 页面（首页/文章/想法/问答/关于）
│   ├── stores/content.ts          # 内容数据层（构建期加载）
│   ├── styles/main.css            # 设计令牌 + 双主题 + 排版
│   ├── types/content.ts           # 内容类型定义
│   └── utils/                     # markdown 渲染 / frontmatter 解析
├── vite.config.ts                 # 动态 base + 404.html 回退
└── package.json
```

## 📚 文档

- [设计稿](docs/design-draft.md) —— 「光的三态」设计概念与视觉系统
- [部署攻略](docs/deploy-github-pages.md) —— GitHub Pages 发布指南

## 📄 License

MIT
