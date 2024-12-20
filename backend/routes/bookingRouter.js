const express = require('express');
const router = express.Router()
const { authMiddleware } = require('../middleware/authMiddleware');
const { createBooking, viewBookings, cancelBooking } = require('../controllers/bookingController');

router.get('/view', authMiddleware, viewBookings)
router.post('/create', authMiddleware, createBooking)
router.delete('/delete/:id', authMiddleware, cancelBooking)
module.exports = router