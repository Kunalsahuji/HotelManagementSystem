const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const {
    homePage,
    userRegister,
    currentUser,
    userLogin,
    userLogout,
    updateUser,
    resetPassword
} = require('../controllers/userController');
const router = express.Router()

// homepage
router.get('/', authMiddleware, homePage)

// current-user
router.get('/current-user', authMiddleware, currentUser)

// user-register
router.post('/user-register', userRegister)

// user-login
router.post('/user-login', userLogin)

// user-update
router.put('/user-update', authMiddleware, updateUser)
// user-logout
router.get('/user-logout', authMiddleware, userLogout)
// user-reset-password-link
router.post('/user-reset-password', authMiddleware, resetPassword)







module.exports = router