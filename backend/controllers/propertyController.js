const jwt = require("jsonwebtoken");
const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendToken } = require("../utils/sendToken");
const Property = require("../models/propertyModel");

module.exports.createProperty = catchAsyncErrors(async (req, res, next) => {
    try {
        const { title, description, location, amenities, price, images } = req.body
        // const user = await User.findOne({ email: req.user.email })
        // console.log(user)
        if (
            !title ||
            !description ||
            !location ||
            !price ||
            !amenities ||
            !images
        ) {
            next(new ErrorHandler("All Fields Are Required!", 400))
        }

        const newProperty = new Property({
            title, description, location, price, amenities, images, owner: req.user._id
        })
        await req.user.properties.push(newProperty)
        await newProperty.save()
        await req.user.save()

        res.status(201).json({ message: "Property Created Sucessfully", Property: { newProperty } })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports.updateProperty = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    try {
        if (!id) {
            next(new ErrorHandler("Property ID is Required!", 400))
        }
        const updateProperty = await Property.findOneAndUpdate(
            { _id: id },
            req.body
            ,
            {
                new: true,
                runValidators: true,
            }
        )
        if (!updateProperty) {
            next(new ErrorHandler("Property Not Found!", 404))
        }
        await updateProperty.save()
        await req.user.save()
        res.json({ message: "Property Updated Successfully", updateProperty })
    } catch (error) {
        console.log(error)
        // next(new ErrorHandler("Error Updating Property", 500))
    }
})