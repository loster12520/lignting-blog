# lignting-blog 设计稿

> 版本：v0.1（待确认） · 面向：文章 / 想法 / 问答 三种内容形态的静态个人博客
> 依据：`docs/designs.md`；现有代码：Vue 3 + Vite + TS + Pinia + Vue Router

---

## 1. 定位与概念

### 1.1 一句话定位

一个把「完整的文章、一闪而过的想法、认真回答的问题」放在一起的私人刊物 —— 既是内容储存库，也是一间有光的书房。

### 1.2 主题概念：「光的三态」Beam · Spark · Echo

`lignting` 这个名字同时让人想到 Lightning（闪电 / 灵感）和 聆听（Lingting），这正好串起三种内容：

| 内容类型 | 光的形态 | 气质 | 呈现方式 |
|---|---|---|---|
| **文章 Article** | 光束 Beam（稳定、聚焦、照亮远方） | 完整、长文、结构化 | 编辑部式的长文阅读页 |
| **想法 Thought** | 火花 Spark（短暂、跳跃、转瞬即逝） | 碎片、即时、无需标题 | 时间线 / 卡片流 |
| **问答 Ask** | 回响 Echo（一问一答的往返） | 对话、解答、沉淀 | 问题列表 + 折叠回答（v0 仅占位） |

**口号（Hero 标语）**：`文章是光束 · 想法是火花 · 问答是回响`

### 1.3 设计关键词

`深夜书房` `编辑部` `温和的电气感` `纸质阅读感`

- 白天是暖纸上的编辑部，夜晚是深空里的灵感灯。
- 主强调色只用一种「闪电琥珀」，克制使用（hover 辉光、进度条、时间戳、关键点缀）。
- 大面积留白 + 细线分隔，文字是主角。

---

## 2. 三种内容形态（核心差异化）

### 2.1 文章 Article ——「完整表达」

- **来源目录**：`resources/articles/*.md`（与 `designs.md` 一致；注意文档写的是 `resource`，实际目录为 `resources`）
- **Frontmatter 规范**：

  ```yaml
  ---
  title: 文章标题          # 必填
  author: lignting        # 必填（默认 lignting；兼容旧示例里的 arthor 拼写）
  date: 2025-01-01        # 必填，YYYY-MM-DD
  tags: [前端, 随笔]       # 可选
  description: 一句话摘要   # 可选，列表页与 SEO 使用
  cover: /cover.png       # 可选，封面图
  ---
  ```

- **列表页呈现**：标题（衬线）+ 摘要 + 作者 · 日期 · 预估阅读时长 + 标签；按日期倒序。
- **详情页呈现**：大标题区（徽章 + 标题 + 作者 / 日期 / 标签 / 阅读时长）→ 正文（完整 markdown 排版）→ 右侧 TOC（滚动高亮）→ 文末标签 + 上一篇 / 下一篇。
- **阅读时长估算**：按中文 400 字/分钟、英文 200 词/分钟粗算，显示「约 N 分钟」。

### 2.2 想法 Thought ——「碎片闪现」

- **来源目录**：`resources/thoughts/*.md`（**目录尚不存在，需要新建**）
- **Frontmatter 规范**：

  ```yaml
  ---
  date: 2025-01-01        # 必填
  tags: [随想]            # 可选
  ---
  ```

  `title` 可选 —— 大多数想法没有标题，正文首行即内容。
- **呈现**：中央时间线 / 卡片流，**时间戳是主视觉**（等宽字体 + 琥珀色），内容为轻量 markdown（支持加粗、链接、行内代码、图片），不套用长文排版。
- **v0 无独立详情页**：点击卡片就地展开完整 markdown 即可（可选能力）。

### 2.3 问答 Ask ——「一次对话」（本版本仅保留接口）

- **来源目录**：`resources/asks/*.md`（已存在示例文件）
- **Frontmatter 规范**（v1 落地时使用）：

  ```yaml
  ---
  question: 问题内容        # 必填
  answerer: lignting       # 必填（回答者）
  date: 2025-01-01         # 可选
  tags: [blog]             # 可选
  answered: true           # 默认 true
  ---
  ```

  正文即回答。
- **v0 交付物**：路由 `/asks` + 页面骨架 + 占位空态（「问答功能即将上线」）+ 类型定义 + 数据加载器（代码就绪但不渲染列表），符合 `designs.md`「仅保留接口」的要求。
- **v1 规划**：问题列表（问题为标题，衬线）+ 点击展开回答 + answerer 与日期。

---

## 3. 信息架构与路由

| 路径 | 页面 | 说明 |
|---|---|---|
| `/` | 首页 | 聚合三种内容：Hero + 最新文章 + 最近想法 + 问答入口 |
| `/articles` | 文章列表 | 卡片列表 + 标签筛选 |
| `/articles/:slug` | 文章详情 | 完整 markdown 渲染 + TOC |
| `/thoughts` | 想法 | 时间线流 |
| `/asks` | 问答 | v0 占位页（接口已就绪） |
| `/about` | 关于 | 个人简介 |

**导航（Header）**：`首页 / 文章 / 想法 / 问答 / 关于`，当前项以琥珀下划线 + 圆点标记。

---

## 4. 视觉系统

### 4.1 色板

**Light（暖纸 · 白天）**

| Token | 色值 | 用途 |
|---|---|---|
| paper | `#FAF6EE` | 页面底色（暖纸） |
| surface | `#FFFFFF` / `#F3EDE1` | 卡片 / 次级面 |
| ink | `#26262B` | 主文字 |
| sub | `#6E6E76` | 次要文字 |
| line | `#E5DED0` | 分隔线 |
| accent | `#F5A800` | 琥珀主强调（图形） |
| accent-text | `#9A5B00` | 琥珀文字链接（保证对比度） |
| glow | `rgba(245,168,0,.28)` | hover 辉光 |

**Dark（深空 · 夜晚）**

| Token | 色值 | 用途 |
|---|---|---|
| night | `#0E1420` | 页面底色（深空蓝黑） |
| surface | `#151C2B` | 卡片 |
| ink | `#E8E6E1` | 主文字 |
| sub | `#9AA3B2` | 次要文字 |
| line | `#232C3E` | 分隔线 |
| accent | `#FFC53D` | 琥珀主强调 |
| glow | `rgba(255,197,61,.22)` | hover 辉光 |

**内容类型徽章色**（细小的圆点，克制使用）：

- 文章 = 琥珀 `#F5A800` · 想法 = 青 `#3EC6D8` · 问答 = 紫 `#8B7CF6`

### 4.2 字体与字号

| 用途 | 字体栈 |
|---|---|
| 展示 / 标题 | `"Noto Serif SC", "Source Han Serif SC", serif`（编辑部气质） |
| 正文 / UI | `system-ui, "Noto Sans SC", sans-serif` |
| 代码 / 时间戳 | `"JetBrains Mono", ui-monospace, monospace` |

字号阶梯：`12 / 14 / 16 / 18 / 24 / 32 / 44 / 56`
正文：`16px`，行高 `1.75`，段落间距 `1.5em`；文章正文容器宽 `720px`，页面容器 `960px`。

### 4.3 间距 / 圆角 / 阴影

- 间距基准 `4px`：`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96`
- 圆角：卡片 `8px`，标签胶囊 `999px`
- 阴影：light `0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.06)`；dark 换为同结构深色 + 琥珀 glow 变体

### 4.4 组件清单

1. **Header**：吸顶 + 毛玻璃（`backdrop-filter: blur(12px)`），导航 + 主题切换（太阳/月亮）
2. **ContentBadge**：内容类型圆点徽章（文章/想法/问答）
3. **TagChip**：标签胶囊
4. **ArticleCard**：标题（衬线）+ 摘要 + 元信息行 + 标签
5. **ThoughtCard**：等宽时间戳 + 内容 + 可选标签；hover 时左侧琥珀竖线点亮
6. **AskItem**（v1）：问题（衬线）+ 折叠回答
7. **TOC**：文章详情右侧目录，滚动高亮当前章节
8. **ReadingProgress**：文章顶部 3px 琥珀阅读进度条
9. **AskPlaceholder**：问答空态（电波图标 + 「即将上线」说明）
10. **Footer**：`© lignting · 由 lignting-blog 驱动` + issue/PR 链接
11. **ThemeToggle**：`prefers-color-scheme` 初始值 + localStorage 记忆

### 4.5 动效

- 页面进入：`fade-up 8px`，`240ms ease-out`
- hover：卡片轻微上浮 + 琥珀 glow
- 阅读进度条：随滚动平滑推进
- 尊重 `prefers-reduced-motion`：关闭辉光与位移

### 4.6 图标

优先内联 SVG（⚡ 闪电、书、火花、对话气泡、太阳/月亮），不引入图标库，保持零额外依赖。

---

## 5. 页面设计

### 5.1 首页 `/`

```
┌──────────────────────────────────────────────┐
│ ⚡ lignting         首页 文章 想法 问答 关于  🌙 │  ← 吸顶毛玻璃导航
├──────────────────────────────────────────────┤
│                                              │
│       聆 听 · 灵 感 存 档                       │  ← Hero：衬线大字
│   文章是光束 · 想法是火花 · 问答是回响            │
│   [ 文章→ ] [ 想法→ ] [ 问答→ ]                 │  ← 三种内容入口
│                                              │
│  ── 最新文章 ─────────────── [查看全部 →]      │
│  ┌────────────────────────────────────────┐  │
│  │ 这里是什么？          lignting · 约1分钟    │  │
│  │ 欢迎光临！这里是聆听的私人博客……             │  │
│  │ [base] [lignting]                     │  │
│  └────────────────────────────────────────┘  │
│  ── 最近想法 ─────────────── [查看全部 →]      │
│  │ 01-01  今天想到：也许该把想法也存下来……      │  │
│  │ 12-28  ……                               │  │
│  ── 问答（即将上线）────────────────────────   │
│  │ ⚡ 问答功能正在路上，接口已就绪 →            │  │
├──────────────────────────────────────────────┤
│  © lignting · 由 lignting-blog 驱动           │
└──────────────────────────────────────────────┘
```

### 5.2 文章列表 `/articles`

- 页头：「文章」衬线标题 + 篇数统计（等宽数字）+ 标签筛选条（`全部 / 前端 / 随笔 / …`）
- 列表：纵向堆叠 ArticleCard（大屏幕可左右分栏：左侧等宽日期竖排，右侧标题+摘要）
- 空态：「还没有文章，等你写下第一篇。」

### 5.3 文章详情 `/articles/:slug`

```
┌ 顶部阅读进度条（3px 琥珀）───────────────────────┐
│ ⚡文章  [返回列表 ←]                           │
│                                              │
│  ★ 这里是什么？                    │ TOC 目录   │
│  lignting · 2025-01-01 · 约1分钟   │ · 欢迎光临 │
│  [base] [lignting]               │ · ……      │
│  ─────────────────────────────── │           │
│  正文（720px，完整 markdown 排版） │ (滚动高亮)  │
│  - 标题层级/引用/代码高亮/表格     │           │
│  - 图片圆角/脚注                 │           │
│  ─────────────────────────────── │           │
│  [上一篇：xxx]    [下一篇：xxx]    │           │
└──────────────────────────────────────────────┘
```

### 5.4 想法 `/thoughts`

```
│ 想 法
│ 一闪而过的，也值得被记录
│
│  01-01  ··················┐
│                           │ 今天想到：也许该把想法也存下来，
│                           │ 不用写成长文，记下来就好。
│                           └
│  12-28  ··················┐
│                           │ 读到一篇好文，值得收藏。
│                           └
└ 空态：「还没有想法」
```

### 5.5 问答 `/asks`（v0 占位）

```
│ 问 答        [即将上线]
│
│  ⚡ 问答功能即将上线
│  文章与想法已经就绪；问答的目录、数据结构和加载
│  接口已预留（resources/asks），将在后续版本接入。
│  [去文章看看 →]  [去想法看看 →]
```

### 5.6 关于 `/about`

头像占位（圆形）· 昵称 `lignting`（衬线）· 简介（私人博客 / 文章储存库）· 联系方式与 issue/PR 入口。

---

## 6. 内容规范

### 6.1 目录结构（目标）

```
resources/
├── articles/*.md      # 文章（已存在）
├── thoughts/*.md      # 想法（需新建目录）
└── asks/*.md          # 问答（已存在，v0 不渲染）
```

### 6.2 命名与 slug

- slug 默认取**文件名（不含扩展名）**；支持 frontmatter `slug` 字段覆盖（便于为中文文件名配置更干净的 URL）。
- 中文文件名可正常构建，URL 会被编码；若部署到 GitHub Pages 等平台，建议文件名用拼音/英文 + frontmatter 中文标题，或显式配置 slug。

### 6.3 兼容性

- 旧示例 `arthor` 拼写：解析器将其作为 `author` 的别名兼容，同时新文档统一写 `author`。
- 文档中 `resource/articles` 与真实目录 `resources/articles` 的差异：以真实目录为准。

---

## 7. 技术设计

### 7.1 技术栈

现有：`Vue 3 + Vite + TS + Pinia + Vue Router`（保持不动）
新增依赖（建议）：`gray-matter`（frontmatter）、`marked`（markdown 渲染）、`highlight.js`（代码高亮）

### 7.2 数据加载（构建期静态化）

```ts
// 构建期把 resources 下所有 md 作为原始字符串打进产物 → 无运行时请求
const raw = import.meta.glob('../../resources/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})
```

- 按路径前缀分类：`articles` → Article，`thoughts` → Thought，`asks` → Ask
- `gray-matter` 解析 frontmatter；`marked` 渲染正文
- 产物为纯静态文件，可直接部署任意静态托管

### 7.3 类型定义（`src/types/content.ts`）

```ts
interface BaseDoc {
  slug: string
  content: string       // 原始 markdown
  html?: string         // 渲染后（惰性）
  date?: string
  tags?: string[]
}
interface Article extends BaseDoc {
  title: string
  author: string
  description?: string
  cover?: string
  readingMinutes?: number
}
interface Thought extends BaseDoc { title?: string }
interface Ask extends BaseDoc {
  question: string
  answerer: string
  answered: boolean
}
```

### 7.4 状态与路由

- Pinia store `useContentStore`：构建期加载 → 按日期倒序 → 暴露 `articles / thoughts / asks` 与 `articleBySlug(slug)`、标签聚合等选择器
- 路由：在现有 `src/router/index.ts` 上扩展第 3 节的路由表；`/asks` 路由与页面在 v0 就创建（占位）

### 7.5 静态部署

`pnpm build` 产出 `dist/`，可部署到 GitHub Pages / Vercel / Cloudflare Pages 等；SPA 路由在纯静态托管下建议配 `_redirects` 或 404.html 回退（或后续改造为多页/SSG 输出）。

---

## 8. 响应式与可访问性

- 断点：`640 / 960 / 1280`
- 文章详情 TOC：`<1280px` 隐藏；想法时间线移动端改为左对齐；导航移动端横向滚动或汉堡折叠
- 对比度满足 WCAG AA；焦点态可见；`prefers-reduced-motion` 生效

---

## 9. 实施路线图

| 阶段 | 内容 |
|---|---|
| **Phase 0** | 设计确认（本文档） |
| **Phase 1** | 骨架：路由 + 导航 + 双主题 + 基础组件 |
| **Phase 2** | 数据层：glob 加载 + frontmatter + store + 类型 |
| **Phase 3** | 文章：列表（含标签筛选）+ 详情 + markdown 渲染 + 代码高亮 + TOC + 进度条 |
| **Phase 4** | 想法：时间线流 |
| **Phase 5** | 问答：占位页 + 接口（类型/加载器） |
| **Phase 6** | 打磨：动效、SEO（标题/描述/OG）、响应式、部署配置 |

---

## 10. 待你确认的问题

1. **视觉方向**：暖纸 × 深空双主题 + 琥珀主色、「编辑部 × 深夜灵感」的方向是否可以？还是想要更极简 / 更活泼 / 纯暗色？
2. **概念命名**：是否采用「光的三态 Beam · Spark · Echo」与标语「文章是光束 · 想法是火花 · 问答是回响」？或直接用 `lignting blog`？
3. **想法形态**：v0 想法不做独立详情页（点击就地展开），可以吗？
4. **依赖**：是否接受引入 `gray-matter + marked + highlight.js` 三个依赖？
5. **部署目标**：GitHub Pages / Vercel / 其他？影响静态路由配置方式。
6. **首页聚合**：首页是否采用「最新文章 + 最近想法 + 问答入口」的聚合布局？

确认或提出修改后，即可进入 Phase 1 开始实现。
