
/** Template of an email to send to the user to reset the password */

function resetPasswordTemplate(name, token){
  return `<html>

  <head>
      <title>Forget Password Email</title>
  </head>
  <body>
      <div>
          <h2> Reset your password</h2>
          <p>Dear<strong> ${name}</strong>, You told us you forgot your password. If you really did, click here to choose a new one:</p>
          <a href="http://localhost:3000/reset-password/${token}"><strong>Choose a New Password</strong></a> 
          <p> If you didn’t mean to reset your password, then you can just ignore this email; your password will not change.</p>
          <hr></hr>
          <p>“Choose a New Password” button not working?</p>
          <p>Just copy and paste this link in your browser:</p>
           <p> http://localhost:3000/reset-password/${token}</p>
            <hr></hr>
            <strong> Please don't reply to this email.</strong>
          <p>Cheers!</p>
      </div>
     
  </body>
  
  </html>`
}

module.exports = resetPasswordTemplate;