const User = require("../models/userModel"); 
const apiError = require('../utils/ApiError');

module.exports.register = async function(req,res,next) {

    try {
        const userData = req.body;
        console.log("userdata",userData.email);
        const isEmail = await User.findOne({email:userData.email});
        console.log("isuser",isEmail)
        if(isEmail){
            throw new apiError('user already registed',400)
        }

        let user = new User(userData);
        await user.save();
         return res.status(201).json({
            success: true,
            message: "user succesfully registed"
          })
        
    } catch (error) {
         next(error);
    }
    
}

module.exports.login = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new apiError("Please enter email and password", 400);
    }

    const isUser = await User.findOne({ email });
    if (!isUser) {
      throw new apiError("Email not found", 400);
    }

    const matchPassword = await isUser.ComparePassword(password);
    if (!matchPassword) {
      throw new apiError("Invalid credentials", 400);
    }

    const token = isUser.GenerateToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", 
      maxAge: 24 * 60 * 60 * 1000,
    });

   
    return res.status(200).json({
      success: true,
      message: "Successfully logged in",
      ...(process.env.NODE_ENV !== "production" && { token }), 
    });
  } catch (error) {
    next(error);
  }
};

module.exports.logout = async function (req, res, next) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};


module.exports.getOne = async function(req,res,next) {
    try {
        const userid = req.user.id;
        const userData = await User.findById(userid);
        if(!userData){
             throw new apiError("user not found", 404);
        }
        return res.status(200).json({
            message:"succesfully get user",
            data:userData
        })
    } catch (error) {
        next(error)

    }
    
}