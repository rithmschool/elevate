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

    if (this.state.isLogin) {
      const data = { email: this.state.email, password: this.state.password };
      token = await ElevateApi.login(data)
    } else {
      const data = {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      }

      token = await ElevateApi.signup(data);
    }

    localStorage.setItem("token", token);
    this.props.checkToken(token);
    this.props.history.push("/");
  }

  render() {
    let loginState = this.state.isLogin;
    let text = loginState ? "Sign In" : "Sign Up"


    const signupForm = (
      <div>
        <Form.Group controlId="formBasicFirstName">
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
        <Form.Group controlId="formBasicLastName">
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
        <div className="login-or"><hr className="hr-or" /><span className="span-or">or</span></div>

        <div class="row justify-content-center"><Button className="google-login btn-block mr-3 ml-3">
          <i className="fa fa-google"></i> Sign in with Google</Button></div>
        
        <div class="row justify-content-center mt-2"><Button className="fb-login btn-block mr-3 ml-3">
          <i className="fa fa-facebook"></i> Sign in with Facebook</Button></div>

        <Form.Text id="signup" className="text-muted mt-3" style={{"text-align": "center"}}>
          Don't have an account? <button className="button-signup" onClick={this.loginOrSignup}>Create One</button>
        </Form.Text>
      </div>
    )


    return (

      <div className="form-container mx-auto">
        {/* <Button name="login" onClick={this.loginOrSignup}>Log In</Button> <Button name="signup" onClick={this.loginOrSignup}>SignUp</Button> */}

        <div className="from-in mt-5">
          <Form onSubmit={this.handleSubmit} >
            <div className="mb-3">{text}</div>
            <Form.Group controlId="formBasicEmail">
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
                placeholder="password"
                className="logInInput"
                id="password"
                name="password"
                type="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </Form.Group>

            {loginState ? "" : signupForm}
            <div class="row justify-content-center"><Button className="login-submit btn-block mr-3 ml-3" type="submit" >Submit</Button></div>

            {loginState ? loginWithSocial : <Form.Text id="signup" className="text-muted" style={{"text-align": "center"}}><button name="login" className="button-signin" onClick={this.loginOrSignup}>Signin</button></Form.Text>}


          </Form>
        </div>

      </div>

    )
  }
}

export default LoginSignUpForm

