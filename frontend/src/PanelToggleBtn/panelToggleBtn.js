import React from "react";
import "./panelToggleBtn.css";

class PanelToggleBtn extends React.Component {

  render() {
    let view = this.props.direction === "toggleRight" 
      ? (<span 
           onClick={this.props.toggleSidebar} 
           id="adminPanel_toggleBtn">&gt;</span>) 
      : (<span 
           onClick={this.props.toggleSidebar}
           id="adminPanel_toggleBtn">&lt;</span>)

    return <div className="panelToggleBtn">{view}</div>;
  }
}

export default PanelToggleBtn;
