const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendToken } = require("../utils/sendToken");
const nodemailer = require('nodemailer');
require('dotenv').config()

module.exports.currentUser = catchAsyncErrors(async (req, res, next) => {
    const currentUser = await User.findById(req.id).exec()
    res.json({ currentUser: currentUser })
})

module.exports.userRegister = catchAsyncErrors(async (req, res, next) => {
    const { username, email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        next(new ErrorHandler("User Already Register with this email address!", 409))
    }
    const user = await User.create({ username, email, password })
    await user.save()
    sendToken(user, 201, res)
})

module.exports.userLogin = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please provide both email and password!", 400));
    }
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("User Not Found with this email address!", 404))
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return next(new ErrorHandler("Wrong Credentials", 401))
    }

    sendToken(user, 200, res)
})

module.exports.userLogout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({ message: "User Successfully logged out!" })
})

module.exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = req.user;
    if (!user) {
        return next(new ErrorHandler("User not found!", 404));
    }
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
        user.password = password;
    }
    await user.save();
    res.status(200).json({
        success: true,
        message: "User updated successfully!",
        user,
    });
});

module.exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return next(new ErrorHandler("User Not Found!", 404))
        const resetToken = user.getJWTToken()
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