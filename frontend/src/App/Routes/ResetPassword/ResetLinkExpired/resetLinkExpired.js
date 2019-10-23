import React from "react";
import './resetLinkExpired.css'

class ResetLinkExpired extends React.Component {
  render() {
    return (
      <div className="reset-pass-exp">
        <h1>Ooops!</h1>
        <h2> That link isn’t working.</h2>
        <p> Password reset links expire after 60 minutes if unused.</p>
        <p>
          If your link isn’t working for any reason you can request a new one
          <a href="http://localhost:3000/reset-password/forgot"> Here.</a>
        </p>
      </div>
    );
  }
}

export default ResetLinkExpired;
