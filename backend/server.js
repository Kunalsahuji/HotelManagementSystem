const express = require('express');
const dotenv = require('dotenv').config();
const app = express()
const ErrorHandler = require('./utils/ErrorHandler');
const userRouter = require('./routes/userRouter')
const propertyRouter = require('./routes/propertyRouter')
const reviewRouter = require('./routes/reviewRouter')
const bookingRouter = require('./routes/bookingRouter')
const adminRouter = require('./routes/adminRouter')
// logger
const logger = require('morgan')
app.use(logger('tiny'))

// Database connection
const dbConnection = require('./config/dbConnection')();

// body-parser 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// session - cookie
const session = require('express-session')
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}))

// COOKIE-PARSER
const cookieParser = require('cookie-parser');
app.use(cookieParser())

// routes 
app.use('/api/user', userRouter)
app.use('/api/property', propertyRouter)
app.use('/api/review', reviewRouter)
app.use('/api/booking', bookingRouter)
app.use('/api/admin', adminRouter)

// error handling
app.all('*', (req, res, next) => {
    next(new ErrorHandler(`Requested URL Not Found ${req.url}`, 404))
})
// Generated Errors 
const { generatedErrors } = require('./middleware/error');
app.use(generatedErrors)

// start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
}) 