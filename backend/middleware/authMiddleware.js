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


// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// module.exports.protect = async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       token = req.headers.authorization.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select('-password');
//       next();
//     } catch (error) {
//       res.status(401).json({ error: 'Not authorized, token failed' });
//     }
//   }

//   if (!token) {
//     res.status(401).json({ error: 'Not authorized, no token' });
//   }
// };

