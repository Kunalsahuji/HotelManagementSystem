const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { createProperty, updateProperty } = require('../controllers/propertyController');
const router = express.Router()

router.get('/', (req, res, next) => {
    res.json({ message: "Property Routes" })
})
router.post('/createProperty', authMiddleware, createProperty)
router.put('/updateProperty/:id', authMiddleware, updateProperty)


module.exports = router