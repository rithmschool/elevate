import React, { Component } from "react";

class Alert extends Component {
  static defaultProps = {
    type: "danger",
    messages: []
  };

  render() {
    return (
      <div className={`alert alert-${this.props.type}`} role="alert" align="center">
        {this.props.messages.map(error => (
          <p className="mb-0 small" key={error}>
            {error}
          </p>
          
        ))}
        <a href={this.props.link}>{this.props.text}</a>
      </div>
    );
  }
}

export default Alert;
