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

`package.json` 中已设置 `"homepage": "."`，便于部署到任意子路径或静态托管（如 GitHub Pages）。执行 `npm run build` 后，除 `build/` 外，**根目录也会有一份与 `build/` 相同的静态产物**（便于直接把仓库根目录当站点根目录发布）。源码仍在 `src/`、`public/`，请勿与根目录下的 `index.html`、`static/` 等构建产物混淆。

## 许可与致谢

- 学习用演示项目；布局概念与属性索引可参考 [CSS-Tricks Grid Guide](https://css-tricks.com/complete-guide-css-grid-layout/#prop-grid)。
- 交互形态灵感来自 FlexBox 演示站思路。
