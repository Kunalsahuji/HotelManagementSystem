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
router.delete('/user-delete/:id', adminMiddleware, deleteUser)

router.get('/properties', adminMiddleware, getProperties)
router.delete('/property-delete/:id', adminMiddleware, deleteProperty)

router.get('/bookings', adminMiddleware, getBookings)
router.delete('/booking-delete/:id', adminMiddleware, deleteBooking)

router.get('/reviews', adminMiddleware, getReviews)
router.delete('/review-delete/:id', adminMiddleware, deleteReview)

router.get('/payments', adminMiddleware, payments)
router.get('/payments/:id', adminMiddleware, singlePayment)

module.exports = router 