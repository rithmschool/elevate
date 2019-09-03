/** Middleware to handle routes authentication */

const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");


/** Middleware to authenticate a valid token
 * req.body ---- { _token }
 * 
 *  Add id onto req for view functions. 
 * 
 * If not, raises Unauthorized
 */

function authRequired(req, res, next) {
  try {
    const reqToken = req.body._token || req.query._token;
    let token = jwt.verify(reqToken, SECRET);
    req.user_id = token.user_id;
    return next();
  }

  catch (err) {
    let unauthorized = new Error("Authentication is required");
    unauthorized.status = 401;
    return next(unauthorized)
  }
}

/** Middleware to authenticate admin token
* req.body ---- { _token }
* 
*  Add id onto req for view functions. 
* 
* If not, raises Unauthorized
*/

function adminRequired(req, res, next) {
  try {
    const reqToken = req.body._token || req.query._token;
    let token = jwt.verify(reqToken, SECRET);
    req.user_id = token.user_id;

    if (token.is_admin) {
      return next();
    }
    // throw an error so we can catch below
    throw new Error()
  }
  catch (err) {
    const unauthorized = new Error("You must be an admin to access")
    unauthorized.status = 401;

    return next(unauthorized)
  }
}

/** Middleware to use when they must provide a valid token & be user matching
*  id provided as route params.
* req.body ---- { _token }
*
* Add id onto req as a convenience for view functions.
*
* Checks if user is an admin to be able to get individual user data
*
* If not, raises Unauthorized.
*
*/
function ensureCorrectUser(req, res, next) {
  
  try {
    const tokenStr = req.body._token || req.query._token;
    let token = jwt.verify(tokenStr, SECRET);
    req.user_id = token.user_id;

    // changing params.id to integer to make correct comparison
    // checks if user is admin to allow admins to get individual user data
    if (token.user_id === Number(req.params.id) || token.is_admin === true) {
      return next()
    }
    // throw an error, so we catch it in our catch,below
    throw new Error()
  }
  catch (err) {
    const unauthorized = new Error("You are not authorized");
    unauthorized.status = 401

    return next(unauthorized)
  }
}

module.exports = {
  authRequired,
  adminRequired,
  ensureCorrectUser,
};
