const express = require('express');
const router = express.Router()
const { adminMiddleware } = require('../middleware/adminMiddleware');
const {
    getUsers,
    deleteUser,
    getProperties,
    deleteProperty,
    getBookings,
    deleteBooking,
    getReviews,
    deleteReview,
    payments,
    singlePayment,
} = require('../controllers/adminController');

router.get('/users', adminMiddleware, getUsers)
router.delete('/user/:id', adminMiddleware, deleteUser)

router.get('/properties', adminMiddleware, getProperties)
router.delete('/property/:id', adminMiddleware, deleteProperty)

router.get('/bookings', adminMiddleware, getBookings)
router.delete('/booking/:id', adminMiddleware, deleteBooking)

router.get('/reviews', adminMiddleware, getReviews)
router.delete('/review/:id', adminMiddleware, deleteReview)

router.get('/payments', adminMiddleware, payments)
router.get('/payment/:id', adminMiddleware, singlePayment)

module.exports = router 