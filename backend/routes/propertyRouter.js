const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { createProperty, updateProperty, searchMyProperties, searchProperties, deleteProperty, viewProperty } = require('../controllers/propertyController');
const router = express.Router()

router.post('/create', authMiddleware, createProperty)
router.get('/search', searchProperties)
router.get('/find', authMiddleware, searchMyProperties)
router.put('/update/:id', authMiddleware, updateProperty)
router.delete('/delete/:id', authMiddleware, deleteProperty)
router.get('/view/:id',authMiddleware, viewProperty)

module.exports = router