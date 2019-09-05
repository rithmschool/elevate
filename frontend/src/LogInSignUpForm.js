import React, { Component } from "react"
import { Button, Form } from 'react-bootstrap';
import ElevateApi from './ElevateApi';
import './LogInSignUpForm.css'
import Alert from "./Alert";

//created client_id form configure a project from google
const client_id = '98215850405-9u3oli17i7vko2f22k6rc7f9srlpjf3m.apps.googleusercontent.com';
let auth2;
class LoginSignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      errors: []
    }
  }

  /** To get profile information 
  *  this code is from https://developers.google.com/identity/sign-in/web/sign-in
  */
  onSignIn = async (googleUser) => {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    
    /** this ID token will be sent to the server with HTTP post request
     *  in ElevateApi to get verify from google
     */
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token)

    /** wait to signinGoogle
     *  use google token to sign in to elevate api
     *  signinGoogle will return a token, use this token
     */
    let token;
    try {
      //TODO:get token to work in the backend!
      token = await ElevateApi.signinGoogle(id_token)
    } catch(errors) {
      return this.setState({ errors })
    }
    localStorage.setItem("token", token);
    await this.props.getCurrentUser();
    this.props.history.push("/");
  }
  
  componentDidMount() {
    /** Initialize the auth2 library and we use this auth2 with method sign in
     *  in handleGoogleSignin below
     */
    window.gapi.load('auth2', () => {
      auth2 = window.gapi.auth2.init({
        client_id: client_id,
        fetch_basic_profile: false,
        scope: 'profile openid' 
      });
    });
  }
  /** auth2.signIn() gives back googleUser which can use
   *  for argument in onSignIn method
   */
  handleGoogleSignin = () => {
    auth2.signIn().then(googleUser => {
      this.onSignIn(googleUser);
    });
  }

  loginOrSignup = evt => {
    if (evt.target.name === "login") {
      this.setState({ isLogin: true })
    } else {
      this.setState({ isLogin: false })
    }
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  handleSubmit = async evt => {
    evt.preventDefault();
    let token;

    try {
      if (this.state.isLogin) {
        const data = { email: this.state.email, 
                      password: this.state.password };
        token = await ElevateApi.login(data)
      } else {
        const data = {
          email: this.state.email,
          password: this.state.password,
          first_name: this.state.firstName,
          last_name: this.state.lastName
        }
        token = await ElevateApi.signup(data);
      }
    } catch (errors) {
      return this.setState({ errors })
    }
    localStorage.setItem("token", token);
    await this.props.getCurrentUser();
    this.props.history.push("/");
  }
  
  render() {
    let loginState = this.state.isLogin;
    let text = loginState ? "Sign In" : "Sign Up"


    const signupForm = (
      <div>
        <Form.Group >
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
    )

    const loginWithSocial = (
      <div>
        <div className="login-or">
          <hr className="hr-or" />
          <span className="span-or">or</span>
        </div>

        <div className="row justify-content-center">
          <Button className="g-signin2 google-login btn-block mr-3 ml-3"
                  onClick={this.handleGoogleSignin}>
            <i className="fab fa-google"></i>  Sign in with Google
          </Button></div>

        <div className="row justify-content-center mt-2">
          <Button className="fb-login btn-block mr-3 ml-3">
            <i className="fab fa-facebook"></i>  Sign in with Facebook
          </Button></div>

        <Form.Text id="signup" 
                    className="text-muted mt-3" 
                    style={{ "textAlign": "center" }}>
          Don't have an account? 
          <button className="button-signup" 
                  onClick={this.loginOrSignup}>
            Create One
          </button>
        </Form.Text>
      </div>
    )


    return (

      <div className="form-container mx-auto">
      
        <div className="form-inside-container mt-5">
          <Form onSubmit={this.handleSubmit} >
          {/* handle login failure */}
          {this.state.errors.length > 0 && 
            <Alert type="danger" messages={["Invalid Email or Password"]} />}

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
              <Button className="login-submit btn-block mr-3 ml-3" 
                      type="submit" >
                Submit
              </Button></div>

            {loginState ? loginWithSocial : 
            <Form.Text id="signup" 
                        className="text-muted" 
                        style={{ "textAlign": "center" }}>
              <button name="login" 
                      className="button-signin" 
                      onClick={this.loginOrSignup}>
                Signin
              </button>
            </Form.Text>}
          </Form>
        </div>

      </div>

    )
  }
}

export default LoginSignUpForm;
