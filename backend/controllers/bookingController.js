const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Property = require("../models/propertyModel");
const Booking = require("../models/bookingModel");
const { bookingConfrimationTemplate, bookingCancellationTemplate } = require('../utils/emailTemplate');
const { sendEmail } = require("../utils/emal");
module.exports.createBooking = catchAsyncErrors(async (req, res, next) => {
    const { propertyId, checkInDate, checkOutDate, totalAmount, status, paymentId } = req.body
    if (!propertyId || !checkInDate || !checkOutDate || !totalAmount || !status || !paymentId) return next(new ErrorHandler("All fields are mendatory", 400))
    const property = await Property.findById(propertyId)
    if (!property) return next(new ErrorHandler("Property Not Found!", 404))

    const booking = new Booking({
        user: req.user._id,
        property: propertyId,
        checkInDate,
        checkOutDate,
        totalAmount,
        status,
        razorpayOrderId: paymentId
    })
    await booking.save()
    await req.user.bookings.push(booking._id)
    await property.bookings.push(booking._id)
    await req.user.save()
    await property.save()

    const emailTamplate = bookingConfrimationTemplate(req.user.username, property.location, checkInDate, checkOutDate)

    await sendEmail(req.user.email, "Booking Confirmation!", emailTamplate)

    res.status(201).json({
        success: true,
        booking,
        paymentId,
        currency: "INR",
        amount: totalAmount
    })

})

module.exports.viewBookings = catchAsyncErrors(async (req, res, next) => {
    const id = req.user._id
    const booking = await Booking.find({ user: id, }).populate("Property", "title location price").populate("User", "username email")
    res.status(200).json(booking)
})

module.exports.cancelBooking = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    const { propertyId, checkInDate, checkOutDate, totalAmount, status, paymentId } = req.body
    const property = await Property.findById(propertyId)

    const booking = await Booking.findById(id)
    if (!booking) return next(new ErrorHandler("Booking Not Found!", 404))
    booking.status = "Cancelled"
    await booking.save()
    const emailTamplate = bookingCancellationTemplate(req.user.username, property.location, checkInDate, checkOutDate)
    await sendEmail(req.user.email, "Booking Cancellation!", emailTamplate)
    res.status(201).json({
        message: "Booking Cancelled",
        booking,
        paymentId,
        currency: "INR",
        status,
        amount: totalAmount
    })

})