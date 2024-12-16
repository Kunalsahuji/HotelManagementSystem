const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const razorpayInstance = require('../config/razorpay')

module.exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    const { amount, currency } = req.body
    if (!amount || !currency) return next(new ErrorHandler("Amount and Currency Required!", 400))
    const option = {
        amount: Number(amount) * 100,
        currency: currency || "INR",
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1,
    }
    const order = await razorpayInstance.orders.create(option)
    res.status(200).json({
        success: true,
        order
    })
})

module.exports.fetchPayment = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    const payment = await razorpayInstance.fetch(id).catch((err) => {
        next(new ErrorHandler(err.message, err.status))
    })
    if (!payment) return next(new ErrorHandler("Error Fetching Payment!", 500))
    res.status(200).json({
        success: true,
        payment
    })
})