import React, { Component } from "react";
import "./GridPropertiesContainer.css";
import { CSS_TRICKS_GRID_GUIDE_URL } from "./gridGuideUrl";

// 父级 Grid 容器属性配置：title 为属性释义，子项 title 为取值释义。
// 术语与属性可与 CSS-Tricks 指南对照：Grid Container / Grid Item / Grid Line / Track / Cell / Area 等。

const parentPropertyConfig = {
  gridTemplateColumns: {
    title:
      "grid-template-columns：定义网格的列轨道（有几列、每列多宽）。决定纵向划分与列宽分配。",
    value: [
      {
        id: "gtc-3fr",
        defaultChecked: true,
        cssValue: "repeat(3, 1fr)",
        title: "三等分列，每列平分容器在列方向上的可用空间（常用布局）。"
      },
      {
        id: "gtc-fixed-mid",
        defaultChecked: false,
        cssValue: "100px 1fr 100px",
        title: "两侧列固定 100px，中间列吃掉剩余空间（经典三栏）。"
      },
      {
        id: "gtc-autofill",
        defaultChecked: false,
        cssValue: "repeat(auto-fill, minmax(90px, 1fr))",
        title:
          "在容器宽度内自动塞入尽可能多的列，每列最小 90px，多余空间均分（响应式卡片）。"
      },
      {
        id: "gtc-px",
        defaultChecked: false,
        cssValue: "80px 120px 80px",
        title: "三列固定像素宽度，总宽小于容器时右侧会留白（便于看 justify-content）。"
      }
    ]
  },
  gridTemplateRows: {
    title:
      "grid-template-rows：定义网格的行轨道（有几行、每行多高）。与列一起构成显式网格。",
    value: [
      {
        id: "gtr-auto",
        defaultChecked: true,
        cssValue: "auto",
        title: "行高由内容撑开（单值表示只有一行显式轨道，其余由隐式行承担）。"
      },
      {
        id: "gtr-2fix",
        defaultChecked: false,
        cssValue: "70px 70px",
        title: "两行固定高度 70px，便于观察 align-items / align-content。"
      },
      {
        id: "gtr-fr",
        defaultChecked: false,
        cssValue: "1fr 2fr",
        title: "两行按 1:2 分配容器在行方向上的剩余空间。"
      }
    ]
  },
  gap: {
    title:
      "gap（旧名 grid-gap）：相邻单元格之间的槽宽。同时作用于行间距与列间距（也可用 row-gap / column-gap 分别设）。",
    value: [
      {
        id: "gap-0",
        defaultChecked: false,
        cssValue: "0px",
        title: "无间距，单元格紧贴。"
      },
      {
        id: "gap-8",
        defaultChecked: true,
        cssValue: "8px",
        title: "较小间距，适合紧凑演示。"
      },
      {
        id: "gap-16",
        defaultChecked: false,
        cssValue: "16px",
        title: "中等间距，网格线更清晰。"
      },
      {
        id: "gap-24",
        defaultChecked: false,
        cssValue: "24px",
        title: "较大间距，便于观察 align-content / justify-content。"
      }
    ]
  },
  justifyItems: {
    title:
      "justify-items：每个网格单元格内，子项在「行轴」（通常即水平方向）上如何对齐；相当于所有子项默认的 justify-self。",
    value: [
      {
        id: "ji-start",
        defaultChecked: false,
        cssValue: "start",
        title: "靠单元格行向起点（LTR 下多为左侧）。"
      },
      {
        id: "ji-end",
        defaultChecked: false,
        cssValue: "end",
        title: "靠单元格行向终点（LTR 下多为右侧）。"
      },
      {
        id: "ji-center",
        defaultChecked: false,
        cssValue: "center",
        title: "在单元格行向上居中。"
      },
      {
        id: "ji-stretch",
        defaultChecked: true,
        cssValue: "stretch",
        title: "拉伸填满单元格行向可用空间（默认值）。"
      }
    ]
  },
  alignItems: {
    title:
      "align-items：每个网格单元格内，子项在「列轴」（通常即垂直方向）上如何对齐；相当于所有子项默认的 align-self。",
    value: [
      {
        id: "ai-start",
        defaultChecked: false,
        cssValue: "start",
        title: "靠单元格列向起点（通常为上沿）。"
      },
      {
        id: "ai-end",
        defaultChecked: false,
        cssValue: "end",
        title: "靠单元格列向终点（通常为下沿）。"
      },
      {
        id: "ai-center",
        defaultChecked: false,
        cssValue: "center",
        title: "在单元格列向上居中。"
      },
      {
        id: "ai-stretch",
        defaultChecked: true,
        cssValue: "stretch",
        title: "拉伸填满单元格列向可用空间（默认值）。"
      }
    ]
  },
  justifyContent: {
    title:
      "justify-content：当「整个网格」在容器行向上比容器窄时，网格整体在行向上如何分布（分配多余空间）。",
    value: [
      {
        id: "jc-start",
        defaultChecked: true,
        cssValue: "start",
        title: "网格靠容器行向起点对齐。"
      },
      {
        id: "jc-end",
        defaultChecked: false,
        cssValue: "end",
        title: "网格靠容器行向终点对齐。"
      },
      {
        id: "jc-center",
        defaultChecked: false,
        cssValue: "center",
        title: "网格在行向上整体居中。"
      },
      {
        id: "jc-space-between",
        defaultChecked: false,
        cssValue: "space-between",
        title: "首尾贴边，中间轨道间距均分。"
      },
      {
        id: "jc-space-around",
        defaultChecked: false,
        cssValue: "space-around",
        title: "每段轨道两侧留白相等（两侧之和等于中间间距）。"
      },
      {
        id: "jc-space-evenly",
        defaultChecked: false,
        cssValue: "space-evenly",
        title: "任意两个相邻轨道之间的间距都相等。"
      }
    ]
  },
  alignContent: {
    title:
      "align-content：当「整个网格」在容器列向上比容器矮时，网格整体在列向上如何分布（分配多余空间）。多行时才明显。",
    value: [
      {
        id: "ac-start",
        defaultChecked: true,
        cssValue: "start",
        title: "网格靠容器列向起点（通常顶部）。"
      },
      {
        id: "ac-end",
        defaultChecked: false,
        cssValue: "end",
        title: "网格靠容器列向终点（通常底部）。"
      },
      {
        id: "ac-center",
        defaultChecked: false,
        cssValue: "center",
        title: "网格在列向上整体居中。"
      },
      {
        id: "ac-space-between",
        defaultChecked: false,
        cssValue: "space-between",
        title: "首末行贴边，中间行间距均分。"
      },
      {
        id: "ac-stretch",
        defaultChecked: false,
        cssValue: "stretch",
        title: "拉伸行轨道以占满容器列向剩余空间。"
      }
    ]
  },
  gridAutoFlow: {
    title:
      "grid-auto-flow：自动布局子项时的「填充顺序」。row 为先横后竖，column 为先竖后横；dense 会尽量填 earlier 留下的空位（可能打乱 DOM 顺序的视觉顺序）。",
    value: [
      {
        id: "gaf-row",
        defaultChecked: true,
        cssValue: "row",
        title: "默认：按行优先依次放入网格。"
      },
      {
        id: "gaf-col",
        defaultChecked: false,
        cssValue: "column",
        title: "按列优先：先填满第一列再下一列。"
      },
      {
        id: "gaf-row-dense",
        defaultChecked: false,
        cssValue: "row dense",
        title: "行优先 + 紧凑填充空穴。"
      },
      {
        id: "gaf-col-dense",
        defaultChecked: false,
        cssValue: "column dense",
        title: "列优先 + 紧凑填充空穴。"
      }
    ]
  }
};

// 与下方 state 默认值保持一致，供 GridBoxContainer 首屏渲染使用
export const initialParentGridStyles = {
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "auto",
  gap: "8px",
  justifyItems: "stretch",
  alignItems: "stretch",
  justifyContent: "start",
  alignContent: "start",
  gridAutoFlow: "row"
};

export default class GridPropertiesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: { ...initialParentGridStyles }
    };
  }

  componentDidMount() {
    this.props.handleProperties(this.state.properties);
  }

  handleProperty(partial) {
    const properties = { ...this.state.properties, ...partial };
    this.setState({ properties });
    this.props.handleProperties(properties);
  }

  render() {
    const keys = [
      "gridTemplateColumns",
      "gridTemplateRows",
      "gap",
      "justifyItems",
      "alignItems",
      "justifyContent",
      "alignContent",
      "gridAutoFlow"
    ];

    return (
      <div className="GridPropertiesContainer">
        <div className="ParentGridProperties">
          <h4 className="GridPropertiesContainer-title">
            父级属性 — Grid 容器（display: grid）
          </h4>
          <div className="properties-row">
            {keys.map(key => (
              <Property
                key={key}
                handleProperty={this.handleProperty.bind(this)}
                property={parentPropertyConfig[key]}
                propertyKey={key}
              />
            ))}
          </div>
        </div>
        <div className="ChildrenGridProperties">
          <h4 className="GridPropertiesContainer-title">
            子项属性 — Grid 项目（网格项）
          </h4>
          <div className="ChildrenGridProperties-properties">
            <p>
              详细属性说明与图示建议对照：{" "}
              <a
                href={CSS_TRICKS_GRID_GUIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {CSS_TRICKS_GRID_GUIDE_URL}
              </a>
              （文中「Parent Container Properties / Child Element Properties」与本页左右栏对应。）
            </p>
            <p>常见子项属性与含义：</p>
            <ul>
              <li>
                <strong>grid-column</strong>：grid-column-start / grid-column-end
                的简写；从第几条列线到第几条，或用 <code>span n</code> 跨多列。
                <span className="ChildProp-example">
                  常用示例（可粘贴到右侧「grid-column」）：<code>1 / 3</code>{" "}
                  占第 1～3 条列线之间（两列宽）；<code>span 2</code>{" "}
                  在自动排位基础上横跨两列；<code>2 / -1</code>{" "}
                  从第 2 条线拉到最后一根（常做「侧栏已占一格，主区吃满剩余列」）；<code>1 / -1</code>{" "}
                  横向拉满整行（配合左侧多列模板时像通栏标题）。
                </span>
              </li>
              <li>
                <strong>grid-row</strong>：与 grid-column 同理，控制行向占位。
                <span className="ChildProp-example">
                  常用示例：<code>1 / 2</code> 只占第一行；<code>span 2</code>{" "}
                  跨两行；<code>2 / 4</code> 从行线 2 到行线 4。
                </span>
              </li>
              <li>
                <strong>grid-area</strong>：一条属性写「行起 / 列起 / 行终 / 列终」四根线，或引用{" "}
                <code>grid-template-areas</code> 里的名字。
                <span className="ChildProp-example">
                  数值示例：<code>1 / 1 / 3 / 4</code>（上、左、下、右四条线，占两行三列区域）。命名示例：容器里写了{" "}
                  <code>
                    {`grid-template-areas: "header header" "sidebar main"`}
                  </code>{" "}
                  时，子项可写 <code>grid-area: header</code>。
                </span>
              </li>
              <li>
                <strong>justify-self</strong>：覆盖容器的 justify-items，单元格内沿「行轴」（通常水平）对齐。
                <span className="ChildProp-example">
                  常用取值：<code>start</code>、<code>end</code>、<code>center</code>、<code>stretch</code>；一般与左侧{" "}
                  <code>justify-items</code> 对比着试。
                </span>
              </li>
              <li>
                <strong>align-self</strong>：覆盖容器的 align-items，单元格内沿「列轴」（通常垂直）对齐。
                <span className="ChildProp-example">
                  常用取值同上；适合把某一格单独顶对齐或垂直居中。
                </span>
              </li>
              <li>
                <strong>place-self</strong>：<code>align-self</code> 与{" "}
                <code>justify-self</code> 的简写（先写列向、再写行向）。
                <span className="ChildProp-example">
                  示例：<code>center center</code> 在格子里水平垂直都居中；<code>start end</code>{" "}
                  上对齐 + 靠行向终点（LTR 下多为右）。
                </span>
              </li>
            </ul>
            <p>
              <strong>组合小抄（右侧分两栏填）：</strong>
            </p>
            <ul>
              <li>
                通栏一条：<code>grid-column: 1 / -1</code>，<code>grid-row</code>{" "}
                按需一行即可。
              </li>
              <li>
                左侧固定宽、右侧自适应的常见拆法：某一格 <code>grid-column: 1 / 2</code>，另一格{" "}
                <code>grid-column: 2 / -1</code>（列模板需至少两列，如{" "}
                <code>200px 1fr</code>）。
              </li>
              <li>
                大图占两格：在自动流动布局里常用 <code>span 2</code>（列或行二选一或都写，看你想扩哪一维）。
              </li>
            </ul>
            <p>
              在右侧演示区可为每个格子输入 grid-column、grid-row，并选择
              justify-self / align-self，观察与左侧容器属性的叠加效果。
            </p>
          </div>
        </div>
      </div>
    );
  }
}

class Property extends Component {
  render() {
    const { property, propertyKey, handleProperty } = this.props;
    return (
      <div className="Property">
        <label className="Property-title" title={property.title}>
          {propertyKey}
        </label>
        {property.value.map(item => (
          <div className="Property-item" key={item.id}>
            <input
              type="radio"
              name={propertyKey}
              id={item.id}
              defaultChecked={item.defaultChecked}
              data-value={item.cssValue}
              onChange={e =>
                handleProperty({
                  [propertyKey]: e.target.getAttribute("data-value")
                })
              }
            />
            <label htmlFor={item.id} title={item.title}>
              {item.cssValue}
            </label>
          </div>
        ))}
      </div>
    );
  }
}
