import React, { Component } from "react";
import "./GridLayoutShowcase.css";

const CODE_HOLY = `/* HTML */
<div class="page">
  <header class="head">header</header>
  <aside class="side">aside</aside>
  <main class="main">main</main>
  <footer class="foot">footer</footer>
</div>

/* CSS */
.page {
  display: grid;
  grid-template-columns: 180px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "head head"
    "side main"
    "foot foot";
  min-height: 100vh;
  gap: 12px;
}

.head { grid-area: head; }
.side { grid-area: side; }
.main { grid-area: main; }
.foot { grid-area: foot; }`;

const CODE_12 = `/* HTML：按 12 列占位 */
<div class="grid12">
  <div class="span-12">通栏</div>
  <div class="span-6">半宽</div>
  <div class="span-6">半宽</div>
  <div class="span-4">三分之一</div>
  <div class="span-4">三分之一</div>
  <div class="span-4">三分之一</div>
</div>

/* CSS */
.grid12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 12px;
}

.span-12 { grid-column: 1 / -1; }
.span-6  { grid-column: span 6; }
.span-4  { grid-column: span 4; }`;

const CODE_CARDS = `/* HTML */
<div class="card-wall">
  <article>1</article>
  <article>2</article>
  <!-- 更多卡片…宽度变化时自动换行列数 -->
</div>

/* CSS */
.card-wall {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}`;

const CODE_CENTER = `/* HTML */
<div class="layout">
  <header class="full">通栏头</header>
  <aside class="gutter"></aside>
  <main class="content">主列（有最大宽）</main>
  <aside class="gutter"></aside>
  <footer class="full">通栏脚</footer>
</div>

/* CSS */
.layout {
  display: grid;
  grid-template-columns: 1fr minmax(280px, 720px) 1fr;
  gap: 12px;
}

.full {
  grid-column: 1 / -1;
}`;

const CODE_BENTO = `/* HTML */
<div class="bento">
  <div class="big">大图 2×2</div>
  <div class="a">A</div>
  <div class="b">B</div>
  <div class="wide">底行横条</div>
</div>

/* CSS：常用 span；格子多时可用线号避免自动排位重叠 */
.bento {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 80px;
  gap: 12px;
}

.big {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}

.a { grid-column: 3; grid-row: 1; }
.b { grid-column: 4; grid-row: 1; }

.wide {
  grid-column: 3 / 5;
  grid-row: 2;
}`;

const CODE_SIDEBAR = `/* HTML */
<div class="app">
  <nav class="nav">侧栏</nav>
  <section class="body">主区域 1fr</section>
</div>

/* CSS */
.app {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 16px;
  min-height: 100vh;
}`;

function CodeBlock({ label, children }) {
  return (
    <>
      <p className="GridLayoutShowcase-codeLabel">{label}</p>
      <pre className="GridLayoutShowcase-code">
        <code>{children}</code>
      </pre>
    </>
  );
}

export default class GridLayoutShowcase extends Component {
  render() {
    return (
      <section className="GridLayoutShowcase" aria-label="常见特殊布局示例">
        <h2 className="GridLayoutShowcase-introTitle">常见特殊布局（单独展示）</h2>
        <p className="GridLayoutShowcase-introDesc">
          与上方交互区独立；每个示例下面是可直接参考的 HTML + CSS（类名可按项目改写）。
        </p>

        <article className="GridLayoutShowcase-recipe">
          <h3>1. 整页骨架 · grid-template-areas（圣杯式）</h3>
          <p>
            用命名区域描述「头 / 侧栏 / 主区 / 脚」，改模板时不用逐个算线号，适合后台壳、文档站。
          </p>
          <div className="GridLayoutShowcase-preview">
            <div className="gls-holy">
              <header className="gls-holy__head gls-cell">header</header>
              <aside className="gls-holy__side gls-cell">aside</aside>
              <main className="gls-holy__main gls-cell">main</main>
              <footer className="gls-holy__foot gls-cell">footer</footer>
            </div>
          </div>
          <CodeBlock label="Grid 相关代码">{CODE_HOLY}</CodeBlock>
        </article>

        <article className="GridLayoutShowcase-recipe">
          <h3>2. 十二列栅格 · repeat(12, 1fr) + span</h3>
          <p>
            与设计稿「12 栏」对齐时常用：<code>span 6</code> 即半宽，<code>1 / -1</code>{" "}
            通栏。
          </p>
          <div className="GridLayoutShowcase-preview">
            <div className="gls-12">
              <div className="gls-12__full gls-cell gls-cell--dark">span 12 通栏</div>
              <div className="gls-12__6 gls-cell">span 6</div>
              <div className="gls-12__6 gls-cell">span 6</div>
              <div className="gls-12__4 gls-cell">span 4</div>
              <div className="gls-12__4 gls-cell">span 4</div>
              <div className="gls-12__4 gls-cell">span 4</div>
              <div className="gls-12__3 gls-cell gls-cell--dark">span 3</div>
              <div className="gls-12__3 gls-cell gls-cell--dark">span 3</div>
              <div className="gls-12__3 gls-cell gls-cell--dark">span 3</div>
              <div className="gls-12__3 gls-cell gls-cell--dark">span 3</div>
            </div>
          </div>
          <CodeBlock label="Grid 相关代码">{CODE_12}</CodeBlock>
        </article>

        <article className="GridLayoutShowcase-recipe">
          <h3>3. 自适应卡片墙 · auto-fill + minmax</h3>
          <p>
            容器变宽时自动多列，变窄时自动减少列数；电商列表、相册缩略图常用。
          </p>
          <div className="GridLayoutShowcase-preview">
            <div className="gls-cards">
              {[1, 2, 3, 4, 5, 6, 7].map(n => (
                <div key={n} className="gls-cell">
                  {n}
                </div>
              ))}
            </div>
          </div>
          <CodeBlock label="Grid 相关代码">{CODE_CARDS}</CodeBlock>
        </article>

        <article className="GridLayoutShowcase-recipe">
          <h3>4. 主列居中 · 两侧「翼」均分剩余空间</h3>
          <p>
            中间主列 <code>minmax(最小, 最大)</code> 限制可读宽，左右{" "}
            <code>1fr</code> 吸收余量；通栏块用 <code>grid-column: 1 / -1</code>。
          </p>
          <div className="GridLayoutShowcase-preview">
            <div className="gls-centerpage">
              <div className="gls-centerpage__full gls-cell">通栏 header</div>
              <div className="gls-cell">左翼</div>
              <div className="gls-cell gls-cell--main">主列</div>
              <div className="gls-cell">右翼</div>
              <div className="gls-centerpage__full gls-cell">通栏 footer</div>
            </div>
          </div>
          <CodeBlock label="Grid 相关代码">{CODE_CENTER}</CodeBlock>
        </article>

        <article className="GridLayoutShowcase-recipe">
          <h3>5. Bento / 不规则宫格 · 跨行跨列</h3>
          <p>
            大屏摘要、仪表盘：大块 <code>span 2</code> + <code>row span</code>，小块补空。
          </p>
          <div className="GridLayoutShowcase-preview">
            <div className="gls-bento">
              <div className="gls-bento__big gls-cell">2×2</div>
              <div className="gls-bento__a gls-cell gls-cell--sm">A</div>
              <div className="gls-bento__b gls-cell gls-cell--sm">B</div>
              <div className="gls-bento__wide gls-cell">横条</div>
            </div>
          </div>
          <CodeBlock label="Grid 相关代码">{CODE_BENTO}</CodeBlock>
        </article>

        <article className="GridLayoutShowcase-recipe">
          <h3>6. 固定侧栏 + 主区自适应 · 两列模板</h3>
          <p>
            比 float 更稳：侧栏 <code>240px</code>（或 <code>minmax</code>），主区{" "}
            <code>1fr</code> 吃满剩余宽度。
          </p>
          <div className="GridLayoutShowcase-preview">
            <div className="gls-sidebar">
              <nav className="gls-sidebar__nav gls-cell">nav</nav>
              <section className="gls-sidebar__main gls-cell">main 1fr</section>
            </div>
          </div>
          <CodeBlock label="Grid 相关代码">{CODE_SIDEBAR}</CodeBlock>
        </article>
      </section>
    );
  }
}
