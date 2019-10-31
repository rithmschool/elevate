import React from "react";
import ElevateApi from "../../../elevateApi";
import { Button, Form } from "react-bootstrap";

import Alert from "../Alert/alert";
import Spinner from "../../Spinner/spinner";
import ResetLinkExpired from "./ResetLinkExpired/resetLinkExpired";
import "./resetPassword.css";

const BASE_URL = "http://localhost:3000";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      first_name: null,
      password: "",
      confirmPassword: "",
      updated: false,
      isLoading: true,
      errors: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  /** send resetPasswordToken to backend to check its validity
   * if valid and not expired yet display the form to enter a new password
   * else display error and a link to try to get a new reset link
   *  */

  async componentDidMount() {
    try {
      const resetPasswordToken = this.props.match.params.token;

      const response = await ElevateApi.verifyResetPasswordToken(
        resetPasswordToken
      );

      this.setState({
        userId: response.id,
        first_name: response.first_name,
        isLoading: false
      });
    } catch (errors) {
      this.setState({ errors, isLoading: false });
    }
  }

  async handleUpdatePassword(evt) {
    evt.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ errors: ["These passwords don't match. Try again?"] });
    } else {
      this.setState({ isLoading: true });
      try {
        const resetPasswordToken = this.props.match.params.token;
        const { userId, password } = this.state;

        await ElevateApi.updatePassword(userId, resetPasswordToken, password);
        this.setState({ isLoading: false });
        this.setState({ errors: [], updated: true });
      } catch (errors) {
        this.setState({ errors });
      }
    }
  }

  resetLinkExpired() {
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
        ResetPassword-container`}
      >
        <ResetLinkExpired />
      </div>
    );
  }

  resetPasswordForm() {
    const {
      errors,
      updated,
      password,
      confirmPassword,
      first_name
    } = this.state;

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
        form-container`}
      >
        <Form onSubmit={this.handleUpdatePassword}>
          <h4 className="first-name">Hello {first_name}</h4>
          <h4 className="new-pass">Choose a new password</h4>

          <Form.Group>
            <Form.Control
              onChange={this.handleChange}
              value={password}
              type="password"
              name="password"
              id="reset-password"
              placeholder="password"
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              onChange={this.handleChange}
              value={confirmPassword}
              type="password"
              name="confirmPassword"
              id="reset-confirmPassword"
              placeholder="confirm password"
            />
          </Form.Group>

          {errors.length > 0 && <Alert type="danger" messages={errors} />}

          {updated && (
            <Alert
              type="success"
              messages={["Password updated successfully!"]}
              text={`Try to login again`}
              link={`${BASE_URL}/login`}
            />
          )}

          {!updated && (
            <Button
              color="info"
              size="sm"
              type="submit"
              className="resetPassword_button"
              disabled={password !== confirmPassword || password === ""}
            >
              Change Password
            </Button>
          )}
        </Form>
      </div>
    );
  }

  render() {
    if (this.state.isLoading) return <Spinner />;
    return this.state.errors.length > 0
      ? this.resetLinkExpired()
      : this.resetPasswordForm();
  }
}
export default ResetPassword;
