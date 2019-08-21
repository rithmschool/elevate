const jwt = require("jsonwebtoken");
const { SECRET }= require("./config")

/**return signed JWT from user data----email and is_admin */
function createToken(user){
    let payload = {
        user_id: user.id,
        is_admin: user.is_admin
    }
    return jwt.sign(payload, SECRET);
}

module.exports = createToken;