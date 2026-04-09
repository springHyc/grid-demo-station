import React, { Component } from "react";
import "./GridDemo.css";

const defaultItemStyle = {
  gridColumn: "auto",
  gridRow: "auto",
  justifySelf: "auto",
  alignSelf: "auto"
};

function buildStylesForItems(items) {
  const styles = {};
  items.forEach(id => {
    styles[id] = { ...defaultItemStyle };
  });
  return styles;
}

// 输入框可留空；空或仅空白时按 CSS 的 auto 参与布局（避免 onChange 立刻写回 auto 导致删不掉）
function gridPlacementForCss(raw) {
  if (raw == null) return "auto";
  const t = String(raw).trim();
  return t === "" ? "auto" : t;
}

export default class GridDemo extends Component {
  constructor(props) {
    super(props);
    const items = [1, 2, 3, 4, 5, 6];
    this.state = {
      items,
      styles: buildStylesForItems(items)
    };
  }

  addChild = () => {
    const items = [...this.state.items];
    const newId = items.length ? Math.max(...items) + 1 : 1;
    items.push(newId);
    this.setState({
      items,
      styles: { ...this.state.styles, [newId]: { ...defaultItemStyle } }
    });
  };

  removeChild = () => {
    const items = [...this.state.items];
    if (items.length <= 1) return;
    const removed = items.pop();
    const styles = { ...this.state.styles };
    delete styles[removed];
    this.setState({ items, styles });
  };

  updateItemStyle = (id, patch) => {
    this.setState({
      styles: {
        ...this.state.styles,
        [id]: { ...this.state.styles[id], ...patch }
      }
    });
  };

  render() {
    const parent = this.props.properties || {};
    const gridContainerStyle = {
      display: "grid",
      minHeight: 420,
      width: "100%",
      boxSizing: "border-box",
      padding: 8,
      backgroundColor: "#ffeecc",
      border: "2px dashed #1a535c",
      ...parent
    };

    return (
      <div className="GridDemo">
        <h3>演示结果</h3>
        <div className="GridDemo-operation">
          <div>
            <label>网格项数量：</label>
            <button type="button" onClick={this.addChild}>
              +
            </button>
            <span> {this.state.items.length} </span>
            <button type="button" onClick={this.removeChild}>
              -
            </button>
          </div>
        </div>
        <div className="GridDemo-grid-wrap">
          <div className="GridDemo-items" style={gridContainerStyle}>
            {this.state.items.map(id => {
              const s = this.state.styles[id] || defaultItemStyle;
              return (
                <div
                  className="GridDemo-item"
                  key={id}
                  style={{
                    gridColumn: gridPlacementForCss(s.gridColumn),
                    gridRow: gridPlacementForCss(s.gridRow),
                    justifySelf: s.justifySelf,
                    alignSelf: s.alignSelf,
                    minWidth: 64,
                    minHeight: 52
                  }}
                >
                  <div className="GridDemo-item-num">{id}</div>
                  <label className="GridDemo-field">
                    <span title="grid-column：列起止线或 span。例：1 / 3、span 2、auto">
                      grid-column
                    </span>
                    <input
                      type="text"
                      placeholder="留空等同 auto，可自写如 1 / 3、span 2"
                      title="grid-column：可清空后重填；空为自动占位。例：1 / 3、span 2、auto"
                      value={s.gridColumn}
                      onChange={e =>
                        this.updateItemStyle(id, {
                          gridColumn: e.target.value
                        })
                      }
                    />
                  </label>
                  <label className="GridDemo-field">
                    <span title="grid-row：行起止线或 span，写法同 grid-column">
                      grid-row
                    </span>
                    <input
                      type="text"
                      placeholder="留空等同 auto，可自写如 1 / 2、span 2"
                      title="grid-row：可清空后重填；空为自动占位。"
                      value={s.gridRow}
                      onChange={e =>
                        this.updateItemStyle(id, {
                          gridRow: e.target.value
                        })
                      }
                    />
                  </label>
                  <label className="GridDemo-field">
                    <span title="justify-self：覆盖容器的 justify-items，控制本项在单元格行向对齐">
                      justify-self
                    </span>
                    <select
                      title="justify-self：单元格内行向对齐；auto 表示跟随 justify-items。"
                      value={s.justifySelf}
                      onChange={e =>
                        this.updateItemStyle(id, {
                          justifySelf: e.target.value
                        })
                      }
                    >
                      <option value="auto">auto（跟随容器）</option>
                      <option value="start">start</option>
                      <option value="end">end</option>
                      <option value="center">center</option>
                      <option value="stretch">stretch</option>
                    </select>
                  </label>
                  <label className="GridDemo-field">
                    <span title="align-self：覆盖容器的 align-items，控制本项在单元格列向对齐">
                      align-self
                    </span>
                    <select
                      title="align-self：单元格列向对齐；auto 表示跟随 align-items。"
                      value={s.alignSelf}
                      onChange={e =>
                        this.updateItemStyle(id, {
                          alignSelf: e.target.value
                        })
                      }
                    >
                      <option value="auto">auto（跟随容器）</option>
                      <option value="start">start</option>
                      <option value="end">end</option>
                      <option value="center">center</option>
                      <option value="stretch">stretch</option>
                    </select>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
