import React, { Component } from "react"
import { Button, Form } from 'react-bootstrap';
import ElevateApi from './ElevateApi';
import './LogInSignUpForm.css'


class LoginSignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: true,
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    }
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
        const data = { email: this.state.email, password: this.state.password };
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
    } catch (err) {
      return this.setState({ err })
    }

    localStorage.setItem("token", token);
    await this.props.getCurrentUser();
    this.props.history.push("/");
  }

  googleOath = () => {
    // Google's OAuth 2.0 endpoint for requesting an access token
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    let form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    const params = {'client_id': '98215850405-5arv9rvobnbgdldm7jij5pql8tbarse7.apps.googleusercontent.com',
                    'redirect_uri': 'http://127.0.0.1:3000',
                    'response_type': 'token',
                    'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
                    'include_granted_scopes': 'true',
                    'state': 'pass-through value'};

    // Add form parameters as hidden input values.
    for (let p in params) {
      let input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
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
                  data-onsuccess="onSignIn"
                  onClick={ this.googleOath }>
            <i className="fa fa-google"></i>
            Sign in with Google
          </Button></div>

        <div className="row justify-content-center mt-2">
          <Button className="fb-login btn-block mr-3 ml-3">
            <i className="fa fa-facebook"></i>
            Sign in with Facebook
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
