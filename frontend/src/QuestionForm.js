import React, { Component } from 'react';
import LoginSignUpForm from './LogInSignUpForm';
import ElevateApi from './ElevateApi';
import { emailValidator } from './helperFunctions';

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: {
        question: true,
        user_email: true
      },
      inputs: {
        question: "My employer offered me too much money!",
        user_email: "money@money.com"
      },
      questionSubmitted: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    let newState = this.state
    // If question is currently invalid
    if (this.state.formValid.question === false) {
      // If input is question and has some length to it make it valid
      if (evt.target.name === 'question' && evt.target.value.length > 10) {
        newState = {
          ...this.state,
          formValid: { ...newState.formValid, question: true },
          user_email: { ...newState.inputs, [evt.target.name]: evt.target.value }
        };
        this.setState({ ...newState });
      }
    }
    // If email is currently invalid
    if (this.state.formValid.user_email === false) {

      // if input is email, compare with validator to check if email is now valid
      if (evt.target.name === 'user_email' && (evt.target.value.match(emailValidator))) {
        newState = {
          ...this.state,
          formValid: { ...newState.formValid, user_email: true },
          inputs: { ...newState.inputs, [evt.target.name]: evt.target.value }
        }
        this.setState({ ...newState });
      } else {
        // If input is not valid, update form with input
        this.setState({ ...newState, inputs: { ...newState.inputs, [evt.target.name]: evt.target.value } });
      }
    }
    // If inputs are all valid, update form with inputs
    this.setState({ ...newState, inputs: { ...newState.inputs, [evt.target.name]: evt.target.value } });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let newState = this.state

    // Validate question
    if (this.state.inputs.question.length <= 10) {
      newState.formValid.question = false;
      this.setState({ ...newState });
    }

    // Validate email
    if (!this.state.inputs.user_email.match(emailValidator)) {
      newState.formValid.user_email = false;
      this.setState({ ...newState });
    }
    // If all inputs valid:

    else if (this.state.formValid.user_email === true && this.state.formValid.question === true) {

      ElevateApi.createQuestion(this.state.inputs)
      // isLoggedIn prop drilled from App.js
      if (this.props.isLoggedIn) {

        this.props.history.push("/admin") // TODO: Change to profile page once it exists
      } else {
        this.setState({ questionSubmitted: true })
      }
    }
  }

  render() {
    return (
      <div>
        {/* Question Input */}
        <div className="form-group">
          <label>Have a work-related legal question? Ask free now:</label>
          <textarea
            disabled={this.state.questionSubmitted ? true : false}
            name="question"
            placeholder=""
            className="form-control"
            value={this.state.inputs.question}
            onChange={this.handleChange}

          />
        </div>
        <p name="error message" style={{ color: "red" }} >{this.state.formValid.question ? null : "Please add a little more detail to your question. (10 characters minimum not met)"}</p>

        {/* Email Input */}
        <div className="form-group">
          <label>Where should we send the response?</label>
          <input
            disabled={this.state.questionSubmitted ? true : false}
            name="user_email"
            className="form-control"
            placeholder="example@gmail.com"
            value={this.state.inputs.user_email}
            onChange={this.handleChange}
          />
        </div>
        <p name="error message" style={{ color: "red" }} >{this.state.formValid.user_email ? null : "Please double check your e-mail and try again."}</p>
        <button onClick={this.handleSubmit}>Submit Question</button>
        {this.state.questionSubmitted ? <h4>Thanks for your question! Our legal experts will get back to you promptly.</h4> : null}
      </div>
    )
  }
}

export default QuestionForm;