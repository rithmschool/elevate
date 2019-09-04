/** Shared config for application; can be required in many places. */

require("dotenv").config();

const SECRET = process.env.SECRET_KEY || 'test';

const PORT = +process.env.PORT || 3001;

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "elevate-test";
} else {
  DB_URI = process.env.DATABASE_URL || 'elevate';
}

console.log("Using database", DB_URI);



module.exports = {
  SECRET,
  PORT,
  DB_URI
};