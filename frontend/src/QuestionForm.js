import React, { Component } from 'react';
import ElevateApi from './ElevateApi';
import { emailValidator } from './helperFunctions';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Row, Col } from 'reactstrap';

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: {
        question: null,
        email: null,
        password: null
      },
      inputs: {
        question: "My employer wants to give me too much money what do I do ?!",
        email: "test@gmail.com",
        password: "secret"
      },
      questionSubmitted: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    let newState = this.state


    // Question validation
    if (this.state.formValid.question === false) {
      // If input is question and has some length to it make it valid
      if (evt.target.name === 'question' && evt.target.value.length > 10) {
        newState = {
          ...this.state,
          formValid: { ...newState.formValid, question: true },
          email: { ...newState.inputs, [evt.target.name]: evt.target.value }
        };
        this.setState({ ...newState });
      }
    }


    // Email validation
    if (this.state.formValid.email === false) {

      // if input is email, compare with validator to check if email is now valid
      if (evt.target.name === 'email' && (evt.target.value.match(emailValidator))) {
        newState = {
          ...this.state,
          formValid: { ...newState.formValid, email: true },
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

  async handleSubmit(evt) {
    evt.preventDefault();
    let newState = this.state

    // Validate question
    if (this.state.inputs.question.length <= 10) {
      newState.formValid.question = false;
      this.setState({ ...newState });
    }

    // Validate email
    if (!this.state.inputs.email.match(emailValidator)) {
      newState.formValid.email = false;
      this.setState({ ...newState });
    }
    // If all inputs valid:

    else if (this.state.formValid.email !== false && this.state.formValid.question !== false) {

      let token = await ElevateApi.createQuestion(this.state.inputs)
      this.setState({ questionSubmitted: true })
      // isLoggedIn prop drilled from App.js
      if (this.props.isLoggedIn) {

        this.props.history.push("/") // TODO: Change to profile page once it exists
      } else {
        localStorage.setItem("token", token);
        this.props.checkToken(token);
        this.props.history.push("/");
      }
    }
  }

  render() {
    return (
      <div>
        <Form>
          <Col>
            {/* Question Input */}
            <FormGroup>
              <Label>Have a work-related legal question? Ask for free now:</Label>
              <Input
                type="textarea"
                disabled={this.state.questionSubmitted ? true : false}
                name="question"
                placeholder=""
                className="form-control"
                value={this.state.inputs.question}
                onChange={this.handleChange}
                valid={this.state.formValid.question}
                invalid={this.state.formValid.question === false}
              />
              <FormFeedback>Please double check your e-mail and try again.</FormFeedback>

            </FormGroup>
          </Col>
          {/* Email Input */}
          <Row form>
            <Col sm={6}>
              <FormGroup>
                <Label> Email:</Label>
                <Input
                  disabled={this.state.questionSubmitted ? true : false}
                  name="email"
                  className="form-control"
                  placeholder="example@gmail.com"
                  value={this.state.inputs.email}
                  onChange={this.handleChange}
                  valid={this.state.formValid.email}
                  invalid={this.state.formValid.email === false}
                />
              </FormGroup>
            </Col>
            {/* Password Input */}
            <FormGroup>
              <Label>Password:</Label>
              <Input
                disabled={this.state.questionSubmitted ? true : false}
                name="password"
                className="form-control"
                value={this.state.inputs.password}
                onChange={this.handleChange}
                type="password"
                placeholder="*********"
                valid={this.state.formValid.password}
                invalid={this.state.formValid.password === false}
              />
            </FormGroup>
          </Row>
          {/* End of form fields */}
          <Button disabled={this.state.questionSubmitted} color="primary" className="m-1" onClick={this.handleSubmit}>Submit Question</Button>

          {this.state.questionSubmitted ? <h4>Thanks for your question! Our legal experts will get back to you promptly.</h4> : null}
        </Form >
      </div >
    )
  }
}

export default QuestionForm;