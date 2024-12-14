const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Property = require("../models/propertyModel");

module.exports.createProperty = catchAsyncErrors(async (req, res, next) => {
    try {
        const { title, description, location, amenities, price, images } = req.body
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
        await req.user.properties.push(newProperty._id)
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
        next(new ErrorHandler("Error Updating Property", 500))
    }
})

module.exports.deleteProperty = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    if (!id) return next(new ErrorHandler("Property ID is required!", 400))
    const deleteProperty = await Property.findByIdAndDelete(id)
    if (!deleteProperty) return next(new ErrorHandler("Property Not Found!", 404))
    res.status(200).json({ message: "Property Deleted Successfully" })
})

module.exports.viewProperty = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    if (!id) return next(new ErrorHandler("Property ID is required", 400))
    const property = await Property.findById(id).populate("owner", "username email")
    if (!property) return next(new ErrorHandler("Property Not Found!", 404))
    res.status(200).json(property)
})

module.exports.searchMyProperties = catchAsyncErrors(async (req, res, next) => {
    const properties = await Property.find({ owner: req.user._id })
    res.status(200).json(properties)
})

module.exports.searchProperties = catchAsyncErrors(async (req, res, next) => {
    const { location, minPrice, maxPrice, title, description, amenities, owner, images, sortBy, sortOrder = 'asc' } = req.query;

    const query = {};

    if (location) {
        query.location = { $regex: location, $options: "i" };
    }

    if (minPrice) {
        query.price = { ...query.price, $gte: minPrice };
    }

    if (maxPrice) {
        query.price = { ...query.price, $lte: maxPrice };
    }

    if (title) {
        query.title = { $regex: title, $options: "i" };
    }

    if (description) {
        query.description = { $regex: description, $options: "i" };
    }

    if (amenities) {
        query.amenities = { $in: amenities.split(',') };
    }

    if (owner) {
        query.owner = owner;
    }

    if (images) {
        query.images = { $in: images.split(',') };
    }

    let sort = {};
    if (sortBy) {
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const properties = await Property.find(query)
        .skip(skip)
        .limit(pageSize)
        .sort(sort);

    const totalCount = await Property.countDocuments(query);

    res.status(200).json({
        totalCount,
        properties
    });
});

