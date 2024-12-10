const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    checkInDate: {
        type: Date,
        required: true,
    },
    checkOutDate: {
        type: Date,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    guests: {
        adults: {
            type: Number,
            required: true,
            default: 1,
        },
        children: {
            type: Number,
            default: 0,
        },
    },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled"],
        default: "Pending",
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking