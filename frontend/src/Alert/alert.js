import React, { Component } from "react";

class Alert extends Component {
  static defaultProps = {
    type: "danger",
    messages: []
  };

  render() {
    const { messages, type, link, text } = this.props;
    return (
      <div className={`alert alert-${type}`} role="alert" align="center">
        {messages.map(error => (
          <p className="mb-0 small" key={error}>
            {error}
          </p>
          
        ))}
        <a href={link}>{text}</a>
      </div>
    );
  }
}

export default Alert;
