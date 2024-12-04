const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendToken } = require("../utils/sendToken");
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
    // const userExists = User.findOne({ email: req.user.email })
    // if (userExists) {
    //     next(new ErrorHandler("User Already Register with this email address!", 409))
    // }
    const user = await new User(req.body).save()
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
    res.json({ message: "User Successfully logged out!" })
})