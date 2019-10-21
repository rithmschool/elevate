import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

import ElevateApi from "../../../../../elevateApi";

class newsletterSignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      signedUp: false,
      emailExists: false
    };
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = async evt => {
    evt.preventDefault();

    try {
      const email = await ElevateApi.postNewsletterSignUp(this.state);
      console.log("email........", email);
      if (email) {
        this.setState({
          email: "",
          signedUp: true
        });
      }
    } catch (err) {
      this.setState({
        email: "",
        emailExists: true
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.signedUp ? (
          <h6>Thanks for signing up!</h6>
        ) : (
          <div>
            <h6>Stay up to date with Brella</h6>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="email" hidden>
                  newsletter email
                </Label>
                <Input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Form>
          </div>
        )}
        {this.state.emailExists ? (
          <p className="text-danger">This email is already signed up</p>
        ) : null}
      </div>
    );
  }
}

export default newsletterSignUpForm;
