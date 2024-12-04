const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const {
    homePage,
    userRegister,
    currentUser,
    userLogin,
    userLogout
} = require('../controllers/userController');
const router = express.Router()

// homepage
router.get('/', authMiddleware, homePage)

// current-user
router.get('/current-user',authMiddleware, currentUser)

// user-register
router.post('/user-register', userRegister)

// user-login
router.post('/user-login', userLogin)

// user-logout
router.get('/user-logout', userLogout)







module.exports = router