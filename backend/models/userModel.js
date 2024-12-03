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
    role: {
        type:
            String,
        enum: ["guest", "host", "admin"],
        default: "guest"
    },
    properties: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property"
    },
    bookings: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    },
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reviews"
    },

}, { timestamps: true })


// Hash Password Before Saving
userSchema.pre("save", async (next) => {
    if (!this.isModified("password")) return next()

    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

// Method to Compare Password
userSchema.methods.comparePassword = async (enteredPassword) => {
    return bcrypt.compare(enteredPassword, this.password)
}

// Generate Token
userSchema.methods.getJWTToken = () => {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '30d' }
    )
}

const User = mongoose.model("User", userSchema)
module.exports = User