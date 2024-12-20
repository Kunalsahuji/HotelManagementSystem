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
    await Booking.deleteMany({ user: req.params.id })
    await Review.deleteMany({ user: req.params.id })
    await Property.deleteMany({ owner: req.params.id })
    res.status(200).json({ message: "User And Realted Data Deleted Successfully" })
})

module.exports.getProperties = catchAsyncErrors(async (req, res, next) => {
    const properties = await Property.find()
    if (!properties) return next(new ErrorHandler("Property Not Found!", 404))
    res.status(200).json(properties)
})

module.exports.deleteProperty = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    const property = await Property.findByIdAndDelete(id)
    if (!property) return next(new ErrorHandler("Property Not Found!", 404))
    await Booking.deleteMany({ property: id })
    await Review.deleteMany({ property: id })
    const users = await User.find({ properties: id })
    for (let user of users) {
        user.properties = user.properties.filter(propertyId => propertyId.toString() != id)
        user.bookings = user.bookings.filter(bookingId => bookingId.toString() != id)
        user.reviews = user.reviews.filter(reviewId => reviewId.toString() != id)
        await user.save()
    }

    res.status(200).json({ message: "Property And Related Data Deleted Successfull" })
})

module.exports.getReviews = catchAsyncErrors(async (req, res, next) => {
    const reviews = await Review.find().populate("property", "title location").populate("user", "username email")
    if (!reviews) return next(new ErrorHandler("Review Not Found!", 404))
    res.status(200).json(reviews)
})

module.exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const review = await Review.findByIdAndDelete(req.params.id)
    if (!review) return next(new ErrorHandler("Review Not Found!", 404))
    const user = await User.findById(review.user)
    if (user) {
        user.reviews = user.reviews.filter(reviewId => reviewId.toString() != req.params.id)
    }
    const property = await Property.findById(review.property)
    if (property) {
        property.reviews = property.reviews.filter(reviewId => reviewId.toString() != req.params.id)
    }
    await user.save()
    await property.save()

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
    const user = await User.findById(booking.user)
    if (user) {
        user.bookings = user.bookings.filter(bookingId => bookingId.toString() != req.params.id)
    }
    const property = await Property.findById(booking.property)
    if (property) {
        property.bookings = property.bookings.filter(bookingId => bookingId.toString() != req.params.id)
    }
    await user.save()
    await property.save()
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