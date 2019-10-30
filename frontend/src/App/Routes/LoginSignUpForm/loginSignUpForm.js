import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

import "./loginSignUpForm.css";
import ElevateApi from "../../../elevateApi";
import Spinner from "../../Spinner/spinner";
import LoginError from "./LoginError/loginError";

//created client_id from configure a project from google
const client_id =
  "98215850405-9u3oli17i7vko2f22k6rc7f9srlpjf3m.apps.googleusercontent.com";
let auth2;

function LoginSignUpForm(props) {
  const [loginView, setLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /** To get profile information
   *  this code is from https://developers.google.com/identity/sign-in/web/sign-in
   */
  const onSignIn = async googleUser => {
    // const profile = googleUser.getBasicProfile();
    // ID: profile.getId()
    // Name: profile.getName()
    // Email: profile.getEmail()

    /** this ID token will be sent to the server with HTTP post request
     *  in ElevateApi to get verify from google
     */
    var id_token = googleUser.getAuthResponse().id_token;

    /** wait to signinGoogle
     *  use google token to sign in to elevate api
     *  signinGoogle will return a token, use this token
     */
    let token;

    try {
      token = await ElevateApi.signinGoogle(id_token);
    } catch (errors) {
      return setErrors(errors);
    }

    localStorage.setItem("token", token);
    await props.getCurrentUser();

    props.history.push("/");
  };

  useEffect(() => {
    /** Initialize the auth2 library and we use this auth2 with
     *  handleGoogleSignin below
     */
    try {
      window.gapi.load("auth2", () => {
        auth2 = window.gapi.auth2.init({
          client_id: client_id,
          fetch_basic_profile: false,
          scope: "profile email openid"
        });
      });
    } catch (errors) {
      return setErrors(errors);
    }
  }, [errors]);

  /** auth2.signIn() gives back googleUser which can be used
   *  for argument in onSignIn method
   */
  const handleGoogleSignin = async () => {
    onSignIn(await auth2.signIn());
  };

  const loginOrSignup = evt => {
    if (evt.target.name === "login") {
      setLoginView(true);
    } else {
      setLoginView(false);
    }
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    let token;

    setIsLoading(true);

    try {
      if (loginView) {
        const data = {
          email,
          password
        };

        token = await ElevateApi.login(data);
      } else {
        const data = {
          email,
          password,
          first_name: firstName,
          last_name: lastName
        };

        token = await ElevateApi.signup(data);
      }
    } catch (errors) {
      setIsLoading(false);
      return setErrors(errors);
    }

    localStorage.setItem("token", token);

    await props.getCurrentUser();

    props.history.push("/");
  };

  const firstLastNameInputs = (
    <div>
      <Form.Group>
        <Form.Control
          placeholder="First Name"
          className="signUpInput"
          id="firstName"
          name="firstName"
          type="text"
          onChange={e => setFirstName(e.target.value)}
          value={firstName}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          placeholder="Last Name"
          className="signUpInput"
          id="lastName"
          name="lastName"
          type="text"
          onChange={e => setLastName(e.target.value)}
          value={lastName}
        />
      </Form.Group>
    </div>
  );

  const emailPasswordInputs = (
    <div>
      <Form.Group>
        <Form.Control
          placeholder="Email"
          id="email"
          name="email"
          type="text"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          placeholder="Password"
          id="password"
          name="password"
          type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
      </Form.Group>
    </div>
  );

  const loginWithSocial = (
    <div>
      <div className="LoginSignUpForm_login-or">
        <hr className="LoginSignUpForm_hr-or" />
        <span className="LoginSignUpForm_span-or">or</span>
      </div>

      {/* Google Sign In Button */}
      <div className="row justify-content-center">
        <Button className="btn-block mr-3 ml-3" onClick={handleGoogleSignin}>
          <i className="fab fa-google"></i>
          <span>Sign in with Google</span>
        </Button>
      </div>
    </div>
  );

  const signUpButton = (
    <div className="row justify-content-center">
      <Button className="login-submit btn-block mr-3 ml-3" type="submit">
        Create an account
      </Button>
    </div>
  );

  const signInButton = (
    <div className="row justify-content-center">
      <Button className="login-submit btn-block mr-3 ml-3" type="submit">
        SIGN IN
      </Button>
    </div>
  );

  const directToSignIn = (
    <Form.Text id="signup" className="text-muted">
      <button
        name="login"
        className="LoginSignUpForm_link-signin"
        onClick={loginOrSignup}
      >
        Sign in
      </button>
    </Form.Text>
  );

  const directToSignUp = (
    <div>
      <Form.Text id="signup" className="text-muted mt-3">
        Don't have an account?
        <button className="LoginSignUpForm_link-signup" onClick={loginOrSignup}>
          Create One
        </button>
      </Form.Text>
    </div>
  );

  const forgotPasswordLink = (
    <div>
      <Form.Text id="signup" className="LoginSignUpForm_link-signup">
        <a href="http://localhost:3000/reset-password/forgot">
          Forgot password?
        </a>
      </Form.Text>
    </div>
  );

  if (isLoading) return <Spinner />;

  return (
    <div
      className="
        container
        col-md-6
        offset-md-3
        col-lg-4
        offset-lg-4
        border 
        rounded 
        shadow"
    >
      <div className="LoginSignUpForm_form-inside-container mt-5">
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">{loginView ? "Sign In" : "Sign Up"}</div>

          {emailPasswordInputs}
          {!loginView && firstLastNameInputs}
          {errors.length > 0 && <LoginError />}
          {loginView ? signInButton : signUpButton}
          {loginView ? loginWithSocial : loginWithSocial}
          {loginView && directToSignUp}
          {loginView ? forgotPasswordLink : directToSignIn}
        </Form>
      </div>
    </div>
  );
}

export default LoginSignUpForm;
