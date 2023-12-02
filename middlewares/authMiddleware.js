const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");


// create authMiddleWare to verify the Json Web Token
const authMiddleWare = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req?.headers?.authorization?.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
                const user = await User.findById(decoded?.id);
                if (user) {
                    req.user = user;
                    next();
                } else {
                    throw new Error("Invalid Token!");
                }
            }
        } catch (error) {
            throw new Error("Your session expired! Please login again!");
        }
    } else {
        throw new Error("Missing Authorization Token In The Request Headers!");
    }
});


// create isAdminMiddleWare to verify is the user admin or not 
const isAdminMiddleWare = asyncHandler( async (req, res, next) => {
    const { email } = req.user;
    const user = await User.findOne({email});
    if (user.role !== 'admin') {
        throw new Error("You are not an Admin!");
    } else {
        next();
    }
});


module.exports = { 
    authMiddleWare, 
    isAdminMiddleWare 
};