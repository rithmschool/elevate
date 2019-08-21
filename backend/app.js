/** Express app for elevate. */
const express = require("express");
const app = express();
/**import auth route */
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/', authRoutes)

/** 404 handler */

app.use(function(req, res, next) {
  const err = new Error("Not Found", 404);

  // pass the error to the next piece of middleware
  return next(err);
});

;

/** general error handler */

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err.stack);

  return res.json({
    status: err.status,
    message: err.message
  });
});

module.exports = app;
