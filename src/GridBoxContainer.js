import React, { Component } from "react";
import GridPropertiesContainer, {
  initialParentGridStyles
} from "./GridPropertiesContainer";
import GridDemo from "./GridDemo";
import "./GridBoxContainer.css";

export default class GridBoxContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: { ...initialParentGridStyles }
    };
  }

  handleProperties(properties) {
    this.setState({ properties });
  }

  render() {
    return (
      <div className="GridBoxContainer">
        <GridPropertiesContainer
          handleProperties={this.handleProperties.bind(this)}
        />
        <GridDemo properties={this.state.properties} />
      </div>
    );
  }
}
