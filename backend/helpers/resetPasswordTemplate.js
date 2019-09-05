
/** Template of an email to send to the user to reset the password */

function resetPasswordTemplate(name, token){
  return `<html>

  <head>
      <title>Forget Password Email</title>
  </head>
  <body>
      <div>
          <h3>Dear ${name},</h3>
          <p>You requested for a password reset, kindly use this <a href="http://localhost:3000/reset-password/${token}">link</a> to reset your password</p>
          <strong> Please don't reply to this emao!</strong>
          <p>Cheers!</p>
      </div>
     
  </body>
  
  </html>`
}

module.exports = resetPasswordTemplate;