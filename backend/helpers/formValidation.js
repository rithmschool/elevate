const { isEmail } = require("validator");

function signupFormValidator(req, res, next) {
  const { first_name, last_name, email, password } = req.body;

  let err = new Error();
  err.status = 400;

  if (!first_name || !last_name || !email || !password) {
    err.message = "Registration form is missing required fields";
    return next(err);
  }

  if (!isEmail(email)) {
    err.message = "Invalid email";
    return next(err);
  }

  if (password.length < 6) {
    err.message = "Invalid password length";
    return next(err);
  }

  next();
}

module.exports = { signupFormValidator };
