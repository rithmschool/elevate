import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import ElevateApi from "./elevateApi";
import "./LogInSignUpForm.css";
import Spinner from "./spinner";
import Alert from "./alert";
import LoginError from "./loginError";


class LoginSignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: true,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      errors: [],
      isLoading: false
    };
  }

  loginOrSignup = evt => {
    if (evt.target.name === "login") {
      this.setState({ isLogin: true });
    } else {
      this.setState({ isLogin: false });
    }
  };

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = async evt => {
    evt.preventDefault();
    let token;
    this.setState({ isLoading: true });

    try {
      if (this.state.isLogin) {
        const data = {
          email: this.state.email,
          password: this.state.password
        };
        token = await ElevateApi.login(data);
      } else {
        const data = {
          email: this.state.email,
          password: this.state.password,
          first_name: this.state.firstName,
          last_name: this.state.lastName
        };
        token = await ElevateApi.signup(data);
      }
    } catch (errors) {
      return this.setState({ isLoading: false, errors });
    }
    localStorage.setItem("token", token);
    await this.props.getCurrentUser();
    this.props.history.push("/");
  };

  render() {
    let loginState = this.state.isLogin;
    let text = loginState ? "Sign In" : "Sign Up";
    console.log('****************************************************************************************************', this.state.errors)
    if (this.state.isLoading) return <Spinner />;


    const signupForm = (
      <div>
        <Form.Group>
          <Form.Control
            placeholder="First Name"
            className="signUpInput"
            id="firstName"
            name="firstName"
            type="text"
            onChange={this.handleChange}
            value={this.state.firstName}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Last Name"
            className="signUpInput"
            id="lastName"
            name="lastName"
            type="text"
            onChange={this.handleChange}
            value={this.state.lastName}
          />
        </Form.Group>
      </div>
    );

    const loginWithSocial = (
      <div>
        <div className="login-or">
          <hr className="hr-or" />
          <span className="span-or">or</span>
        </div>

        <div className="row justify-content-center">
          <Button className="google-login btn-block mr-3 ml-3">
            <i className="fab fa-google"></i> Sign in with Google
          </Button>
        </div>

        <div className="row justify-content-center mt-2">
          <Button className="fb-login btn-block mr-3 ml-3">
            <i className="fab fa-facebook"></i> Sign in with Facebook
          </Button>
        </div>

        <Form.Text
          id="signup"
          className="text-muted mt-3"
          style={{ textAlign: "center" }}
        >
          Don't have an account?
          <button className="button-signup" onClick={this.loginOrSignup}>
            Create One
          </button>
        </Form.Text>
      </div>
    );
    return (
      <div
        className=" container col-md-6 offset-md-3 col-lg-4 offset-lg-4 border rounded shadow"
        style={{ marginTop: "10%", backgroundColor: "#F4F6F8" }}
      >
        <div className="form-inside-container mt-5">
          <Form onSubmit={this.handleSubmit}>
            {/* handle login failure */}
          {this.state.errors.length > 0 && <LoginError />}
            <div className="mb-3">{text}</div>
            <Form.Group>
              <Form.Control
                placeholder="Email"
                className="logInInput"
                id="email"
                name="email"
                type="text"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Password"
                className="logInInput"
                id="password"
                name="password"
                type="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </Form.Group>

            {loginState ? "" : signupForm}
            <div className="row justify-content-center">
              <Button
                className="login-submit btn-block mr-3 ml-3"
                type="submit"
              >
                Submit
              </Button>
            </div>
            {loginState ? (
              loginWithSocial
            ) : (
              <Form.Text
                id="signup"
                className="text-muted"
                style={{ textAlign: "center" }}
              >
                <button
                  name="login"
                  className="button-signin"
                  onClick={this.loginOrSignup}
                >
                  Signin
                </button>
              </Form.Text>
            )}
          </Form>
        </div>
      </div>
    );
  }
}
export default LoginSignUpForm;
