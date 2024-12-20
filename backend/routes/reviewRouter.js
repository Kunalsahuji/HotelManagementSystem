const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { viewReviews, addReview, updateReview, deleteReview } = require('../controllers/reviewController');
const router = express.Router()

router.post('/create', authMiddleware, addReview)
router.put('/update/:id', authMiddleware, updateReview)
router.delete('/delete/:id', authMiddleware, deleteReview)
router.get('/view/:propertyId', authMiddleware, viewReviews)

module.exports = router