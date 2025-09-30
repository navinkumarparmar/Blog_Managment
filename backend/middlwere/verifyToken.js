const jwt = require('jsonwebtoken');

const apiError = require('../utils/ApiError');

module.exports.verifyToken = async function(req,res,next) {

     try {
    const token = req.cookies.token; 

    if (!token) {
      throw new apiError("Not authenticated", 401);
    }

    const decoded = jwt.verify(token, process.env.SecreteKey);
    console.log("decode",decoded)
    req.user = decoded;
    next();
  } catch (error) {
    next(new apiError("Invalid or expired token", 401));
  }
    
}