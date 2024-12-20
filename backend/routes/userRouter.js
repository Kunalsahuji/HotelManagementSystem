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
router.post('/user-register', userRegister)
router.post('/user-login', userLogin)
router.put('/user-update', authMiddleware, updateUser)
router.get('/user-logout', authMiddleware, userLogout)
router.post('/user-reset-password', authMiddleware, resetPassword)

module.exports = router