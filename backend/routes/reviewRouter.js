const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { viewReviews, addReview, updateReview, deleteReview } = require('../controllers/reviewController');
const router = express.Router()

router.post('/reviewCreate', authMiddleware, addReview)
router.put('/reviewUpdate/:id', authMiddleware, updateReview)
router.delete('/reviewDelete/:id', authMiddleware, deleteReview)
router.get('/viewReview/:propertyId', authMiddleware, viewReviews)

module.exports = router