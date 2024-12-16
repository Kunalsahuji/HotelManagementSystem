const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Property = require("../models/propertyModel");
const Booking = require("../models/bookingModel");
const Review = require("../models/reviewModel")
const User = require("../models/userModel");

module.exports.getUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find({ isAdmin: false })
    if (!users) return next(new ErrorHandler("User Not Found!", 404))
    res.status(200).json(users)
})

module.exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id)
    if (!user) return next(new ErrorHandler("User Not Found!", 404))
    res.status(200).json({ message: "User Deleted Successfully" })
})

module.exports.getProperties = catchAsyncErrors(async (req, res, next) => {
    const properties = await Property.find()
    if (!properties) return next(new ErrorHandler("Property Not Found!", 404))
    res.status(200).json(properties)
})

module.exports.deleteProperty = catchAsyncErrors(async (req, res, next) => {
    const property = await Property.findByIdAndDelete(req.params.id)
    if (!property) return next(new ErrorHandler("Property Not Found!", 404))
    res.status(200).json({ message: "Property Deleted Successfull" })
})

module.exports.getReviews = catchAsyncErrors(async (req, res, next) => {
    const reviews = await Review.find().populate("property", "title location").populate("user", "username email")
    if (!reviews) return next(new ErrorHandler("Review Not Found!", 404))
    res.status(200).json(reviews)
})

module.exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const review = await Review.findByIdAndDelete(req.params.id)
    if (!review) return next(new ErrorHandler("Review Not Found!", 404))
    res.status(200).json({ message: "Review Deleted Successfull" })
})

module.exports.getBookings = catchAsyncErrors(async (req, res, next) => {
    const bookings = await Booking.find().populate("property user")
    if (!bookings) return next(new ErrorHandler("Booking Not Found!", 404))
    res.status(200).json(bookings)
})

module.exports.deleteBooking = catchAsyncErrors(async (req, res, next) => {
    const booking = await Booking.findByIdAndDelete(req.params.id)
    if (!booking) return next(new ErrorHandler("Booking Not Found!", 404))
    res.status(200).json({ message: "Booking Deleted Successfull" })
})

module.exports.payments = catchAsyncErrors(async (req, res, next) => {
    const { page = 1, limit = 10, status } = req.query
    const filter = {}
    if (status) filter.status = status
    const payments = await Booking
        .find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .populate("user", "username email")
        .populate("property", "location price title")
        .sort({ createdAt: -1 })
    if (!payments) return next(new ErrorHandler("Payment Not Found!", 404))
    res.status(200).json({
        success: true,
        data: payments,
        page,
        limit
    })
})

module.exports.singlePayment = catchAsyncErrors(async (req, res, next) => {
    const bookingId = req.params.id
    const payment = await Booking
        .findById(bookingId)
        .populate("user", "username email")
        .populate("property", "location price title")
    if (!payment) return next(new ErrorHandler("Payment Not Found!", 404))
    res.status(200).json({
        success: true,
        data: payment
    })

})