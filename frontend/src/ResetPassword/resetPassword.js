import React from "react";
import ElevateApi from "../elevateApi";
import { Col, Button, Form, Label, Input, Row } from "reactstrap";
import Alert from "../Alert/alert";
import Spinner from "../Spinner/spinner";
import ResetLinkExpired from "../resetLinkExpired";
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
    this.updatePassword = this.updatePassword.bind(this);
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

  async updatePassword(evt) {
    evt.preventDefault();

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ errors: ["These passwords don't match. Try again?"] });
    }

    try {
      const resetPasswordToken = this.props.match.params.token;
      const { userId, password } = this.state;

      await ElevateApi.updatePassword(userId, resetPasswordToken, password);
      this.setState({ errors: [], updated: true });
    } catch (errors) {
      this.setState({ errors });
    }
  }
  render() {
    const {
      isLoading,
      errors,
      updated,
      password,
      confirmPassword,
      first_name
    } = this.state;
    if (isLoading) return <Spinner />;
    if (errors.length > 0)
      return (
        <div className=" container col-md-6 offset-md-3 col-lg-4 offset-lg-4 border rounded shadow ResetPassword-container">
          <br></br>
          <ResetLinkExpired />
        </div>
      );

    return (
      <div
        className=" container col-md-6 offset-md-3 col-lg-4 offset-lg-4 border rounded shadow"
        style={{ marginTop: "10%", backgroundColor: "#F4F6F8" }}
      >
        <Form onSubmit={this.updatePassword}>
          <br />
          <h4 style={{ textAlign: "center" }}>Hello {first_name}</h4>
          <hr></hr>
          <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
            Choose a new password
          </h4>
          <hr></hr>
          <br></br>
          <Row form></Row>
          <Row>
            <Col md={12}>
              <Label className="form-group has-float-label">
                <Input
                  onChange={this.handleChange}
                  value={password}
                  type="password"
                  name="password"
                  id="reset-password"
                />
                <span>Password</span>
              </Label>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Label className="form-group has-float-label">
                <Input
                  onChange={this.handleChange}
                  value={confirmPassword}
                  type="password"
                  name="confirmPassword"
                  id="reset-confirmPassword"
                />
                <span>Confirm password</span>
              </Label>
            </Col>
          </Row>
          <hr></hr>
          {errors.length > 0 && <Alert type="danger" messages={errors} />}

          {updated && (
            <Alert
              type="success"
              messages={["Password updated successfully!"]}
              text={`Try to login again`}
              link={`${BASE_URL}/login`}
            />
          )}
          <Col align="center">
            {!this.state.updated && <Button color="info" size="sm">
              Change Password
            </Button>}
          </Col>
          <br></br>
        </Form>
      </div>
    );
  }
}
export default ResetPassword;
