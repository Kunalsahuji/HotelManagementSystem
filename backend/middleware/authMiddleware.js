const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const ErrorHandler = require('../utils/ErrorHandler')
const { catchAsyncErrors } = require('./catchAsyncErrors')

exports.authMiddleware = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return next(new ErrorHandler("Please login to access the resource!", 401))
    }
    // if (!token) return res.status(401).json({ message: "Unauthorized" });

    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.id = id
    // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // const user = await User.findById(decoded.id);
    // req.user = user
    next()
})