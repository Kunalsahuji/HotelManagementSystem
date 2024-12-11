const mongoose = require('mongoose');
const PropertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
    },
    amenities: {
        type: [String],
        default: []
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true })

// PropertySchema.pre("save", function (next) {
//     this.updatedAt = Date.now();
//     next();
// });
const Property = mongoose.model("Property", PropertySchema)
module.exports = Property