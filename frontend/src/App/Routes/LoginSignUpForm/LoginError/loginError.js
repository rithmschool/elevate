import React from "react";

class LoginError extends React.Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h5>
          Invalid Email or Password
          <p>Forgot your password?</p>
          <a href="http://localhost:3000/reset-password/forgot"> click here.</a>
        </h5>
      </div>
    );
  }
}

export default LoginError;
