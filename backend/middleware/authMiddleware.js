const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const ErrorHandler = require('../utils/ErrorHandler')
const { catchAsyncErrors } = require('./catchAsyncErrors')

exports.authMiddleware = catchAsyncErrors(async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            return next(new ErrorHandler("Please login to access the resource!", 401))
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id);
        if (!user) {
            return next(new ErrorHandler("Invalid or expired token", 400));
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        next(error)
    }
})
