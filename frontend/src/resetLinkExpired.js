import React from "react";

class ResetLinkExpired extends React.Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Ooops!</h1>
        <h2> That link isn’t working.</h2>
        <p>
          Password reset links expire after 60 minutes if unused.<br></br>
          If your link isn’t working for any reason,<br></br>
          you can request a new one{" "}
          <a href="http://localhost:3000/reset-password/forgot"> Here.</a>
        </p>
      </div>
    );
  }
}

export default ResetLinkExpired;
