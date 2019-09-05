import React from "react";

class LoginError extends React.Component {
 

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h5> Invalid Email or Password <br></br>
          Forgot your password?<br></br>
          <a href="http://localhost:3000/reset-password/forgot"> click here.</a>
        </h5>
        <hr></hr>
      </div>
    );
  }
}

export default LoginError;

