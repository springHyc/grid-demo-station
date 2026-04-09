# grid-demo-station

基于 [Create React App](https://create-react-app.dev/) 的 **CSS Grid** 交互演示项目，结构参考 [FlexBoxDemoStation](https://github.com/springHyc/FlexBoxDemoStation)：左侧调节网格容器属性，右侧实时预览；底部单独展示常见整页/组件级布局，并附带可复制 HTML + CSS。

## 功能概览

- **交互区**：父级属性（`grid-template-columns/rows`、`gap`、`justify-items`、`align-items`、`justify-content`、`align-content`、`grid-auto-flow` 等）单选切换；子项可编辑 `grid-column` / `grid-row` 及 `justify-self` / `align-self`。
- **说明文案**：属性释义、子项常用写法示例；术语可与 [CSS-Tricks：A Complete Guide to CSS Grid Layout](https://css-tricks.com/complete-guide-css-grid-layout/#prop-grid) 对照。
- **常见特殊布局**：圣杯式 `grid-template-areas`、12 列栅格、`auto-fill` 卡片墙、主列居中、Bento 宫格、侧栏 + `1fr` 主区等，每项含独立预览与代码块。

## 环境要求

- Node.js 建议 **16+**（当前工具链为 `react-scripts@5`，在较新 Node 上可正常开发与构建）。

## 快速开始

```bash
cd grid-demo-station
npm install
npm start
```

浏览器访问开发服务器提示的本地地址（一般为 `http://localhost:3000`）。

## 常用命令

| 命令            | 说明                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| `npm start`     | 开发模式                                                                                                      |
| `npm run build` | 生产构建至 `build/`，随后将 `build/` 内全部内容同步到**项目根目录**（脚本见 `scripts/sync-build-to-root.js`） |
| `npm test`      | 运行 Jest 测试（`CI=true npm test` 单次执行）                                                                 |

使用 **pnpm** 时，安装为 `pnpm install`，构建为 `pnpm build`（与 `npm run build` 等价，均会执行 `react-scripts build` 并运行 `scripts/sync-build-to-root.js`）。

## 源码结构（简要）

| 路径                             | 说明                                                                                               |
| -------------------------------- | -------------------------------------------------------------------------------------------------- |
| `src/App.js`                     | 页头与整体布局                                                                                     |
| `src/GridBoxContainer.js`        | 左右分栏容器                                                                                       |
| `src/GridPropertiesContainer.js` | 左侧父级属性 + 子项说明                                                                            |
| `src/GridDemo.js`                | 右侧可交互网格演示                                                                                 |
| `src/GridLayoutShowcase.js`      | 底部「常见特殊布局」与示例代码                                                                     |
| `src/gridGuideUrl.js`            | CSS-Tricks 指南链接常量                                                                            |
| `scripts/sync-build-to-root.js`  | `npm run build` 结束后把 `build/` 复制到根目录；会先删除根目录旧的 `static/`，避免残留旧 hash 文件 |

## 部署说明

`package.json` 中已设置 `"homepage": "."`，便于部署到任意子路径或静态托管（如 GitHub Pages）。执行 `npm run build` 或 `pnpm build` 后，除 `build/` 外，**根目录也会有一份与 `build/` 相同的静态产物**（便于直接把仓库根目录当站点根目录发布）。源码仍在 `src/`、`public/`，请勿与根目录下的 `index.html`、`static/` 等构建产物混淆。

### 部署到 GitHub Pages（`*.github.io`）

#### 1. 本地发布流程（在 `gh-pages` 分支上出静态文件）

1. 在 **`master`**（或你的默认开发分支）上改完代码并提交。
2. 切换到 **`gh-pages`** 分支，把开发分支合并进来（例如 `git checkout gh-pages` → `git merge master`）。
3. 安装依赖后执行构建（任选其一）：
   - `pnpm build`
   - 或 `npm run build`
4. 将**合并后的代码 + 根目录构建产物**提交并推送，例如：
   - `git add -A && git commit -m "chore: deploy" && git push origin gh-pages`
5. 推送完成后，GitHub Pages 会在一段时间内自动更新；站点地址一般为 `https://<用户名>.github.io/<仓库名>/`（若是个站仓库且配置为用户/组织站，则可能是 `https://<用户名>.github.io/`）。

> **说明**：GitHub Pages 从某一**分支的根目录**读静态文件。`pnpm build` / `npm run build` 会把 `build/` 里的内容同步到**仓库根目录**，因此无需再选 `build` 子文件夹；这正是 `scripts/sync-build-to-root.js` 的作用。

#### 2. 仓库里新建项目时的 GitHub Pages 配置（只做一次）

这是最关键的一步，按顺序在网页上操作即可：

1. 打开 GitHub 上的本仓库，点击顶部的 **Settings**。
2. 左侧菜单找到并点击 **Pages**。
3. 在 **Build and deployment（构建与部署）** 区域，将 **Source** 选为 **Deploy from a branch**。
4. 在 **Branch** 下拉框里选择**实际存放静态站点文件的分支**：
   - 若你按上一节把构建产物放在 **`gh-pages` 分支根目录**，这里选 **`gh-pages`**；
   - 若你改为在 **`main`** 或 **`master`** 分支根目录放构建产物，则选对应分支。
5. **Folder（文件夹）** 保持 **`/ (root)`**，点击 **Save**。

保存后页面会提示站点 URL；首次生效可能需要一两分钟。

#### 3. 与 `sync-build-to-root.js` 的关系

GitHub Pages 从所选分支的**根路径**提供文件，而 Create React App 默认只生成在 `build/` 目录下。`scripts/sync-build-to-root.js` 在每次构建结束时把 `build/` 内文件复制到项目根目录，这样你只要把该分支推上去，Pages 用 **root** 即可正确访问 `index.html` 与 `static/` 等资源。

## 许可与致谢

- 学习用演示项目；布局概念与属性索引可参考 [CSS-Tricks Grid Guide](https://css-tricks.com/complete-guide-css-grid-layout/#prop-grid)。
- 交互形态灵感来自 FlexBox 演示站思路。
