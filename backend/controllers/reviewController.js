const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const Property = require("../models/propertyModel");
const Review = require("../models/reviewModel")

module.exports.addReview = catchAsyncErrors(async (req, res, next) => {
    const { propertyId, rating, comment } = req.body
    const property = await Property.findById(propertyId)
    if (!property) return next(new ErrorHandler("Property Not Found!", 404))
    const existingReview = await Review.findOne({
        user: req.user._id,
        property: propertyId
    })
    if (existingReview) return next(new ErrorHandler("You have already reviewed this property", 400))
    const newReview = new Review({
        property: propertyId,
        user: req.user._id,
        rating,
        comment
    })
    if (!rating || !comment) return next(new ErrorHandler("All fields are required", 400))
    await newReview.save()
    await req.user.reviews.push(newReview._id)
    await property.reviews.push(newReview._id)
    await req.user.save()
    await property.save()
    res.status(201).json({ message: "Review Added Successfully", newReview })
})

module.exports.updateReview = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    if (!id) return next(new ErrorHandler("Review ID is required", 400))
    const { rating, comment } = req.body
    const review = await Review.findById(id)
    if (!review) return next(new ErrorHandler("Reivew Not Found!", 404))
    if (review.user.toString() !== req.user._id.toString()) return next(new ErrorHandler("You are not authorized to update this review!", 401))
    review.rating = rating
    review.comment = comment
    await review.save()
    await req.user.save()
    res.status(200).json({ message: "Review Updated", review }) //if need change the review

})

module.exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    const review = await Review.findById(id)
    if (!review) return next(new ErrorHandler("Review Not Found", 404))
    if (review.user.toString() !== req.user._id.toString()) return next(new ErrorHandler("You are not authorize to delete this task", 401))
    await Review.findByIdAndDelete(id)
    const user = await User.findById(review.user)
    if (user) {
        user.reviews = user.reviews.filter(reviewId => reviewId.toString() !== id)
        await user.save()
    }
    const property = await Property.findById(review.property)
    if (property) {
        property.reviews = property.reviews.filter(reviewId => reviewId.toString() !== id)
        await property.save()
    }
    res.status(200).json({
        message: "Review Deleted Successfully"
    })
})

module.exports.viewReviews = catchAsyncErrors(async (req, res, next) => {
    const { propertyId } = req.params
    const review = await Review.find({ property: propertyId }).populate("user", "username email createdAt").sort({ createdAt: -1 })
    if (review.length === 0) return res.status(200).json([])
    res.status(200).json(review)
}) 