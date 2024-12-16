const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 4,
        select: false, // Do not return password field by default
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    properties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
    }],
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reviews",
    }],
}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE }
    );
};

const User = mongoose.model("User", userSchema);
module.exports = User

