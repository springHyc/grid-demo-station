import React, { Component } from "react";
import "./App.css";
import GridBoxContainer from "./GridBoxContainer";
import GridLayoutShowcase from "./GridLayoutShowcase";
import { CSS_TRICKS_GRID_GUIDE_URL } from "./gridGuideUrl";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CSS Grid 演示站</h1>
          <span>
            参考 FlexBox 演示站结构搭建，用于交互理解 Grid
            容器与子项属性。左侧选择属性值，右侧观察布局变化。更系统的说明见 CSS-Tricks
            的
            <a
              href={CSS_TRICKS_GRID_GUIDE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              A Complete Guide to CSS Grid Layout（#prop-grid 起为属性索引）
            </a>
            。
          </span>
        </header>
        <GridBoxContainer />
        <GridLayoutShowcase />
      </div>
    );
  }
}

export default App;
