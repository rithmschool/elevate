import React, { Component } from "react"
import { Button, Form } from 'react-bootstrap';
import ElevateApi from './ElevateApi';


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


    const signupForm = (
      <div className="ml-2 mt-3">
        <Form.Group>
          <label htmlFor="firstName">First Name</label>
          <input
            className="signUpInput"
            id="firstName"
            name="firstName"
            type="text"
            onChange={this.handleChange}
            value={this.state.firstName}
          />
        </Form.Group>
        <Form.Group>
          <label htmlFor="lastName">Last Name</label>
          <input
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
    return (
      <div>
        <Button name="login" onClick={this.loginOrSignup}>Log In</Button> <Button name="signup" onClick={this.loginOrSignup}>SignUp</Button>

        <div >
          <Form onSubmit={this.handleSubmit} >
            <Form.Group>
              <label htmlFor="id" >Email</label>
              <input
                className="logInInput"
                id="email"
                name="email"
                type="text"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </Form.Group>
            <Form.Group>
              <label htmlFor="password" >Password</label>
              <input
                className="logInInput"
                id="username"
                name="password"
                type="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </Form.Group>
            {loginState ? "" : signupForm}
            <Button className="login-submit" type="submit" >Submit</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default LoginSignUpForm

