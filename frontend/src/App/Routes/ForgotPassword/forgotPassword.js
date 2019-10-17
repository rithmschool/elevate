import React from "react";
import { Button, Form } from "react-bootstrap";

import "./forgotPassword.css";
import ElevateApi from "../../../elevateApi";
import Alert from "../Alert/alert";
import Spinner from "../../Spinner/spinner";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      errors: [],
      msgFromServer: [],
      emailSent: false,
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
      emailSent: false,
      errors: []
    });
  }

  async sendEmail(evt) {
    evt.preventDefault();

    if (this.state.email === "") {
      this.setState({ errors: ["Please enter your email address!"] });
    } else {
      try {
        this.setState({ isLoading: true });

        let response = await ElevateApi.forgotPassword({
          email: this.state.email
        });

        this.setState({
          errors: [],
          emailSent: true,
          msgFromServer: [response.message],
          isLoading: false
        });
      } catch (errors) {
        this.setState({ errors, isLoading: false });
      }
    }
  }

  render() {
    const { email, errors, emailSent, isLoading } = this.state;

    if (isLoading) return <Spinner />;

    return (
      <div
        className={`
          container
          col-md-6
          offset-md-3
          col-lg-4
          offset-lg-4
          border
          rounded
          shadow
          forgotPassword_container`}
      >
        <div>
          <Form onSubmit={this.sendEmail}>
            <div className="text">
              <h3 className="title">Reset Password</h3>
              <p>
                Please enter your email address and we'll send you instructions
                on how to reset your password
              </p>
            </div>

            <Form.Group>
              <Form.Control
                className="form-group has-float-label"
                onChange={this.handleChange}
                value={email}
                type="email"
                name="email"
                id="forgt-email"
                placeholder="email"
              />
            </Form.Group>

            {errors.length > 0 && <Alert type="danger" messages={errors} />}

            {emailSent && (
              <Alert type="success" messages={this.state.msgFromServer} />
            )}
            <div className="button">
              <Button size="sm" className="btn btn-info">
                Send Password Recovery Email
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
