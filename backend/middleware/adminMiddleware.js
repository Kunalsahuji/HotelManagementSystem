const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken")

module.exports.adminMiddleware = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies
    if (!token) return next(new ErrorHandler("Please Login to access the resource!", 401))

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const user = await User.findById(decoded.id)
    req.user = user

    if (!req.user || !req.user?.isAdmin) return next(new ErrorHandler("Access denied : Only Admin can Access", 401))

    next()
})