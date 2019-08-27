import React, { Component } from 'react';


class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: {
        question: true,
        email: true
      },
      inputs: {
        question: "",
        email: ""
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    let newState = this.state
    this.setState({ ...newState, inputs: { ...newState.inputs, [evt.target.name]: evt.target.value } });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let response = "hello"
  }

  render() {
    return (
      <div>

        {/* Question Input */}
        <div className="form-group">
          <label>Have a work-related legal question? Ask for free now:</label>
          <textarea
            name="question"
            placeholder=""
            className="form-control"
            value={this.state.inputs.question}
            onChange={this.handleChange}
            
          />
        </div>
        <p name="error message" style={{ color: "red" }} >{this.state.formValid.question ? null : "Please input a question to ask our legal experts."}</p>

        {/* Email Input */}
        <div className="form-group">
          <label>Where should we send the response?</label>
          <input
            name="email"
            className="form-control"
            placeholder="example@gmail.com"
            value={this.state.inputs.email}
            onChange={this.handleChange}
          />
        </div>
        <p name="error message" style={{ color: "red" }} >{this.state.formValid.email ? null : "Username invalid. Please try again."}</p>
        <button onClick={this.handleSubmit}>Submit Question</button>
      </div>
    )
  }
}

export default QuestionForm;