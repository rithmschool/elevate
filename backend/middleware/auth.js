/** Middleware to handle routes authentication */

const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

/**FIX ME: is email ok to be identifer for particular user???? */

/** Middleware to authenticate a valid token
 * 
 *  Add email onto req for view functions. 
 * 
 * If not, raises Unauthorized
 */

 function authRequired(req, res, next) {
     try{
        
         const reqToken = req.body._token || req.query._token;
         
        
         let token = jwt.verify(reqToken, SECRET);
         
         req.user_id = token.user_id;
         return next();
     }

     catch (err){
         let unauthorized = new Error("Authentication is required");
         unauthorized.status = 401;
         return next(unauthorized)
     }
 }

 /** Middleware to authenticate admin token
 * 
 *  Add email onto req for view functions. 
 * 
 * If not, raises Unauthorized
 */

 function adminRequired(req, res, next) {
     try{
         const reqToken = req.body._token || req.query._token;
         let token = jwt.verify(reqToken, SECRET);
         req.user_id = token.user_id;

         if(token.is_admin){
             return next();
         }
         // throw an error so we can catch below
         throw new Error()
     }
     catch(err) {
        const unauthorized = new Error("You must be an admin to access")
        unauthorized.status = 401;

        return next(unauthorized)
     }
 }

 /** Middleware to use when they must provide a valid token & be user matching
 *  email provided as route param.
 *
 * Add email onto req as a convenience for view functions.
 *
 * If not, raises Unauthorized.
 *
 */
function ensureCorrectUser(req, res, next){
    try{
        const tokenStr = req.body._token || req.query._token;
        let token = jwt.verify(tokenStr, SECRET);
        req.user_id = token.user_id;
        // console.log("token user", token.user_id )
        // console.log("req param id", req.params.id)
        // console.log("check", token.user_id == req.params.id)
        if(token.user_id === Number(req.params.id)){

            return next()
        }
        // throw an error, so we catch it in our catch,below
        throw new Error()
    }
    catch(err){
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
  