const express = require('express');
const router = express.Router()
const { authMiddleware } = require('../middleware/authMiddleware');
const { createBooking, viewBookings, cancelBooking } = require('../controllers/bookingController');

router.post('/createBooking', authMiddleware, createBooking)
router.get('/viewBooking', authMiddleware, viewBookings)
router.delete('/deleteBooking/:id', authMiddleware, cancelBooking)
module.exports = router