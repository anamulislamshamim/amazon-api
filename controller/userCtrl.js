const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require('express-async-handler');

// create a controller that will create user in the User model 
const createUserCtrl = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email: email});

    if (!findUser) {
        // create a new user 
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        // user already exist
        throw new Error('User Already Exist!')
    }
});


// create login controller to perform login functionalities
const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if the user exist or not 
    let isUserExist = await User.findOne({email: email});
    if (isUserExist && (await isUserExist.isPasswordMatched(password))) {
        res.json({
            id: isUserExist._id,
            firstname: isUserExist?.firstname,
            lastname: isUserExist?.lastname, 
            email: isUserExist?.email, 
            mobile: isUserExist?.mobile,
            jwtToken: generateToken(isUserExist?._id)
        })
    } else {
        throw new Error("Invalid Credentials. Please register");
    }
});


// create getAllUser controller to get all users
const getAllUserCtrl = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (err) {
        throw new Error(err);
    }   
});


// create getSingleUser controller to getch single user from the database 
const getSingleUserCtrl = asyncHandler(async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        throw new Error(error);
    }
});


// create deleteUser controller to delete a user from database 
const deleteUserCtrl = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        res.json(deletedUser);
    } catch (error) {
        throw new Error(error);
    }
});


// create updateUser controller to update a user from database 
const updateUserCtrl = asyncHandler(async (req, res) => {
    try {
        const dataWhatWeWantToUpdate = {
            firstname: req.body?.firstname,
            lastname: req.body?.lastname,
            email: req.body?.email,
            mobile: req.body?.mobile,
        };

        const updateOptions = {
            new: true
        };

        const { _id } = req.user;
        console.log(_id);
        const updatedUser = await User.findByIdAndUpdate(_id, dataWhatWeWantToUpdate, updateOptions);
        res.json(updatedUser);
    } catch (error) {
        throw new Error(error);
    }
})


module.exports = { 
    createUserCtrl, 
    loginUserCtrl, 
    getAllUserCtrl, 
    getSingleUserCtrl, 
    deleteUserCtrl, 
    updateUserCtrl 
};