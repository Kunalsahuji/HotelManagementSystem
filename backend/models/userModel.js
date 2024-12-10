const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is Required"],
        unique: true,
        trim: true,

    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        lowercase: true,

    },
    password: {
        type: String,
        required: [true, "Password is Required"],
        minlength: 4,
        select: false
    },
    // role: {
    //     type:
    //         String,
    //     enum: ["guest", "host", "admin"],
    //     default: "guest"
    // },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    properties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property"
    }],
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reviews"
    }],

}, { timestamps: true })


// Hash Password Before Saving
userSchema.pre("save", function () {
    if (!this.isModified("password")) {
        return;
    }
    try {
        let salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    } catch (error) {
        console.log(error)
        next(error)
    }
})
// Method to Compare Password
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}


// Generate Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE }
    )
}


const User = mongoose.model("User", userSchema)
module.exports = User