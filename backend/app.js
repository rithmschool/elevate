/** Express app for elevate. */
const express = require("express");
const app = express();

/** import routes */
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** routes */
app.use('/', authRoutes);
app.use('/users', usersRoutes);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new Error("Not Found", 404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  console.error(err.stack);

  return res.json({
    status: err.status,
    message: err.message
  });
});

module.exports = app;
