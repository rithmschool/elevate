const { isEmail, normalizeEmail, trim } = require("validator");

function signupFormValidator(req, res, next) {
  const { first_name, last_name, email, password, passwordConfirm } = req.body;

  // Trim whitespace on inputs except password
  const email_sanitized = normalizeEmail(trim(email));
  const first_name_sanitized = trim(first_name);
  const last_name_sanitized = trim(last_name);

  let err = new Error();
  err.status = 400;

  if (!first_name_sanitized || !last_name_sanitized || !email_sanitized || !password) {
    err.message = "Registration form is missing required fields";
    return next(err);
  }

  if (!isEmail(email_sanitized)) {
    err.message = "Invalid email";
    return next(err);
  }

  if (password.length < 6) {
    err.message = "Invalid password length";
    return next(err);
  }

  if (password !== passwordConfirm) {
    err.message = "Passwords do not match";
    return next(err);
  }

  /** Passes sanitized inputs to User.regsiter */
  req.body.email = email_sanitized;
  req.body.first_name = first_name_sanitized;
  req.body.last_name = last_name_sanitized;
  next();
}

module.exports = { signupFormValidator };
