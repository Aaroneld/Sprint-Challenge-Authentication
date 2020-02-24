/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const JWT = require('jsonwebtoken');

function validateUser(req, res, next){
  const token = req.headers.authorization;
  console.log(token);
  if(token){
      JWT.verify(token, "my secret secret secret", (err, decodedToken) => {
          if(err){
              res.status(401).json({message: "can't touch this", err: err.message})
          }else{
              next();
          }
      });
  }else {
      res.status(401).message({message: "You shall not pass!"})
  }
}


function generateToken(user){

  const payload = {
      userID: user.id,
      username: user.username
  }
  const secret = "my secret secret secret";

  const options = {
      expiresIn: '1d'
  }

  return JWT.sign(payload,secret,options);

}

module.exports = {
  
  validateUser,
  generateToken

}
