const express = require('express');
const router = express.Router()
const { processPayment, fetchPayment } = require('../controllers/paymentController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, processPayment)
router.get('/fetchPayment/:id', authMiddleware, fetchPayment)
module.exports = router