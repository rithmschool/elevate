/** Start server for elevate. */

const app = require("./app");
const { PORT } = require("./config");
const AWS = require("aws-sdk");

// const bluebird = require('bluebird');

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// configure AWS to work with promises
// AWS.config.setPromisesDependency(bluebird);

// create S3 instance
// const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise

// Define POST route

app.listen(PORT, function() {
  console.log(`Server starting on port ${PORT}!`);
});
