const jwt = require("jsonwebtoken");
const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendToken } = require("../utils/sendToken");
const bcrypt = require("bcrypt")
const nodemailer = require('nodemailer');
const Property = require("../models/propertyModel");
require('dotenv').config()
// homepage
module.exports.homePage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "Secure homepage" })

})
// current-user
module.exports.currentUser = catchAsyncErrors(async (req, res, next) => {
    const currentUser = await User.findById(req.id).exec()
    res.json({ currentUser: currentUser })
})
// user-register
module.exports.userRegister = catchAsyncErrors(async (req, res, next) => {
    // const userExists =await User.findOne({ email: req.user.email })
    // if (userExists) {
    //     next(new ErrorHandler("User Already Register with this email address!", 409))
    // }
    const { username, email, password } = req.body
    const user = await User.create({ username, email, password})
    await user.save()
    sendToken(user, 200, res)
})
// user-login
module.exports.userLogin = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email }).select("+password").exec()
    if (!user) {
        return next(new ErrorHandler("User Not Found with this email address!", 404))
    }
    const isMatch = user.comparePassword(req.body.password)
    if (!isMatch) {
        return next(new ErrorHandler("Wrong Credentials", 401))
    }

    sendToken(user, 200, res)
})
// user-logout
module.exports.userLogout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token")
    res.status(200).json({ message: "User Successfully logged out!" })
})
// user-update
module.exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const user = await User.findOne({ email })
        if (username) req.username = username
        if (email) req.email = email
        if (password) req.password = await bcrypt.hash(password, 10)
        await user.save()
        res.status(200).json({ message: "Profile Updated Successfully!", user: user })
    } catch (error) {
        console.log(error)
        next(new ErrorHandler(error.message, 500));
    }

})
// user-update
// module.exports.updateUser = catchAsyncErrors(async (req, res, next) => {
//     const { id } = req.params; // Assuming the user ID is passed as a URL parameter
//     const updatedData = req.body; // Data to update

//     let user = await User.findById(id);

//     if (!user) {
//         return next(new ErrorHandler("User Not Found with this ID!", 404));
//     }

//     // Update user details
//     user = await User.findByIdAndUpdate(id, updatedData, {
//         new: true, // Return the updated document
//         runValidators: true, // Ensure schema validations are applied
//     });

//     res.status(200).json({
//         success: true,
//         message: "User updated successfully!",
//         user,
//     });
// });

module.exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return next(new ErrorHandler("User Not Found!", 404))
        // const resetToken = user.getJWTToken()
        const resetToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRE }
        )
        const resetLink = `http://localhost:5173/${resetToken}`

        const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.PASS
            },
        })
        const mailOption = {
            from: process.env.ADDRESS,
            to: email,
            subject: `Password Reset Request`,
            text: `Click on the link to reset your password ${resetLink}`
        }

        await transport.sendMail(mailOption)
        await user.save()
        res.json({ message: "Password reset link sent to your email" })
    } catch (error) {
        console.log(error)
        next(new ErrorHandler(error.message, 500))
    }
})