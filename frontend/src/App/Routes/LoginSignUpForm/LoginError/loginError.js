import React from "react";
import Alert from "react-bootstrap/Alert";

class LoginError extends React.Component {
  render() {
    return <Alert variant="danger">Invalid Email or Password</Alert>;
  }
}

export default LoginError;
