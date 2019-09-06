/** Shared config for application; can be required in many places. */

require("dotenv").config();

const SECRET = process.env.SECRET_KEY || "test";

const PORT = +process.env.PORT || 3001;

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS || `elevate2super@gmail.com`;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || `elevate2super12345`;
const FROM_EMAIL = `superAgent@gmail.com`;
const SERVICE = "gmail";
const EXPIRE_TIME = 3600000; // 1 hour

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "elevate-test";
} else {
  DB_URI = process.env.DATABASE_URL || "elevate";
}

console.log("Using database", DB_URI);


module.exports = {
  SECRET,
  PORT,
  DB_URI
};
