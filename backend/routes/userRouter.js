const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const {
    userRegister,
    currentUser,
    userLogin,
    userLogout,
    updateUser,
    resetPassword
} = require('../controllers/userController');
const router = express.Router()

router.get('/current-user', authMiddleware, currentUser)
router.post('/register', userRegister)
router.post('/login', userLogin)
router.put('/update', authMiddleware, updateUser)
router.get('/logout', authMiddleware, userLogout)
router.post('/reset-password', authMiddleware, resetPassword)

module.exports = router