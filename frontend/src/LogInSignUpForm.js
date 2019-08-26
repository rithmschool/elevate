import React, { Component } from "react"
import { Button, Form } from 'react-bootstrap';


class LoginSignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true, 
      email:"", 
      password:"", 
      firstName:"", 
      lastName:""}
    this.loginOrSignup = this.loginOrSignup.bind(this)
    // this.userInput = this.userInput.bind(this)
  }

  loginOrSignup(evt){
    if (evt.target.name === "login") {
      this.setState({isLogin : true})
    } else{
      this.setState({isLogin : false})
    }
  }

  async handleSubmit(evt){
    evt.preventDefault();
    let data;
    let endpoint;
    
    if (this.state.isLogin) {
      data = { 
        email: this.state.email, 
        password: this.state.password
      }
      endpoint = "login"
    } else {
      data = {
        email: this.state.email, 
        password: this.state.password, 
        firstName: this.props.firstName, 
        lastName: this.props.lastName
      }
      endpoint = "users"
    }
  }
  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  // has to connect to api to log in
  // async userInput(username, password){
  //   await someApi.login(username, password)
  // }

  // async userSignUp(username, password, firstName, lastName, email){
  //   await someApi.signUp(username, password, firstName, lastName, email);
  // }
  
  
  
  render(){
    let loginState = this.state.isLogin
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
    return(

    <div>
      <Button name="login" onClick={this.loginOrSignup}>Log In</Button> <Button  name="signup" onClick={this.loginOrSignup}>SignUp</Button>
      
      <div >
        <Form onSubmit={this.inputLogin} >
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
          {loginState ? "": signupForm}
          <Button className="login-submit" type="submit" >Submit</Button>
        </Form>
      </div>

    </div>
    ) 
  }
    
} 

export default LoginSignUpForm

// inputLogin = async evt => {
//   evt.preventDefault();
//   const data = { email: this.state.email, password: this.state.password };
//   const request = await axios.post("http://localhost:3001/login", data)
  

//   // this.props.history.push("/")
// }