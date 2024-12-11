const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { createProperty, updateProperty, searchMyProperties, searchProperties, deleteProperty, viewProperty } = require('../controllers/propertyController');
const router = express.Router()

router.get('/', (req, res, next) => {
    res.json({ message: "Property Routes" })
})
router.post('/createProperty', authMiddleware, createProperty)
router.get('/search', searchProperties)
router.get('/findProperty', authMiddleware, searchMyProperties)
router.put('/updateProperty/:id', authMiddleware, updateProperty)
router.get('/deleteProperty/:id', authMiddleware, deleteProperty)
router.get('/viewProperty/:id', viewProperty)

module.exports = router