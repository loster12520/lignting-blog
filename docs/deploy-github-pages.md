# 发布到 GitHub Pages 攻略

> 本文档配套项目内已做好的配置（vite base、404.html 回退、GitHub Actions 工作流），
> 你只需按下面步骤操作即可完成首次发布，之后每次 `git push` 自动重新部署。

---

## 0. 原理简介（30 秒看懂为什么这样配）

| 难点 | 原因 | 我们的解法 |
|---|---|---|
| **子路径 base** | 项目仓库部署后地址是 `https://<用户名>.github.io/<仓库名>/`，资源路径要带仓库名前缀 | `vite.config.ts` 里按 `GITHUB_REPOSITORY` 自动算 base |
| **深链 404** | 直接访问 `/articles/xxx` 这类 SPA 路由，GitHub Pages 会返回 404 | 构建时自动生成 `404.html`（= index.html），SPA 路由接管 |
| **自动部署** | 每次更新内容都要手动构建上传太麻烦 | `.github/workflows/deploy.yml`，push 即自动构建发布 |

已配好的三处，无需你改：

- `vite.config.ts` —— 动态 base + `404.html` 生成插件
- `src/router/index.ts` —— `createWebHistory(import.meta.env.BASE_URL)` 跟随 base
- `.github/workflows/deploy.yml` —— 构建 + 发布流水线

---

## 1. 前置准备

- [ ] 一个 GitHub 账号
- [ ] 本机已安装 git（`git --version` 可验证）
- [ ] git 已配置用户名和邮箱（你已配置：xiaos / xiaoshuo12520@outlook.com ✅）

---

## 2. 在 GitHub 上创建仓库

1. 打开 https://github.com/new
2. **Repository name**：推荐 `lignting-blog`（任意名字都行，base 会自动适配）
3. 可见性选 **Public**（GitHub Pages 免费版仅支持公开仓库）
4. **不要**勾选 "Add a README" 等初始化选项（保持空仓库，避免冲突）
5. 点 **Create repository**

> 💡 如果你想要 `https://<用户名>.github.io` 这种顶级地址，可以把仓库命名为
> `<用户名>.github.io`（如 `xiaos.github.io`），这样 base 自动为 `/`，其余步骤完全一样。

---

## 3. 把项目推送到 GitHub

在项目根目录 `C:\code\project\front\lignting-blog` 打开终端（或 VS Code 终端），执行：

```bash
# 1. 初始化仓库（只需一次）
git init

# 2. 加入所有文件并提交
git add .
git commit -m "feat: 完成 lignting-blog 首版"

# 3. 默认分支改名为 main
git branch -M main

# 4. 关联远程仓库（换成你自己的仓库地址）
git remote add origin https://github.com/xiaos/lignting-blog.git

# 5. 推送（首次会要求登录 GitHub）
git push -u origin main
```

> node_modules 和 dist 已被 `.gitignore` 排除，不会上传。

---

## 4. 开启 GitHub Pages

1. 打开仓库页面 → **Settings**（设置）
2. 左侧菜单 → **Pages**（左侧面板里找 "Pages"）
3. **Build and deployment** → **Source** 选 **GitHub Actions**
4. 保存后等几分钟，Actions 会自动构建发布

> 首次开启后，GitHub 需要跑一次完整构建。之后每次 push 到 main 分支都会自动重新部署。

---

## 5. 验证

1. 打开仓库 **Actions** 标签页，看到绿色 ✅ 说明构建发布成功
2. 访问你的站点：

- 项目仓库：`https://<用户名>.github.io/lignting-blog/`
- 用户主页仓库：`https://<用户名>.github.io/`

3. 重点测试：
   - 首页 ✅
   - 点进一篇文章（详情页）
   - **直接访问** 文章地址（如 `.../lignting-blog/articles/这里是什么？`）——验证 404 回退
   - 切换深浅主题后刷新——验证记忆

---

## 6. 日常更新内容（以后只需一步）

写完新文章/想法后：

```bash
git add .
git commit -m "feat: 新增文章 xxx"
git push
```

push 后 Actions 自动重新构建发布，约 1 分钟生效。

---

## 7. 常见问题排查

| 现象 | 原因 | 解决 |
|---|---|---|
| 页面空白，控制台资源 404 | base 没适配仓库名 | 确认仓库已开启 Actions 构建（第 4 步）；检查 Actions 日志里 base 是否带仓库名 |
| 直接访问深链 404 | 404.html 未生效 | 确认 dist 里有 404.html（本地 `pnpm build` 后应出现）；可能需等下一次部署 |
| Actions 构建失败 | 依赖安装/版本问题 | 打开 Actions 日志看报错；确认 `pnpm-lock.yaml` 已提交 |
| 图片等静态资源缺失 | 资源在 `public/` 下路径带仓库名前缀 | 用 `import.meta.env.BASE_URL` 拼资源路径 |
| 想用自定义域名 | 绑定域名 | Pages 设置里填 Custom domain，并加 CNAME 记录；仓库根放 `CNAME` 文件 |
| 构建成功但页面是旧的 | 缓存 | 强制刷新（Ctrl+Shift+R），或等 1 分钟后再试 |

---

## 8. 本地预览生产版（可选）

```bash
pnpm build     # 构建
pnpm preview   # 本地预览 dist（默认 http://localhost:4173）
```

> 注意：本地构建 base 为 `/`，与 GitHub 上的 `/lignting-blog/` 不同，属正常现象。
