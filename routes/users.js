// routes/users.js
const express = require('express')
const router = express.Router()
const { register, signIn } = require('../controllers/userController')
const {
  validateRegister,
  validateLogin
} = require('../middlewares/validateUser')

// 註冊 API
router.post('/sign-up', validateRegister, register)

// 登入 API
router.post('/sign-in', validateLogin, signIn)

module.exports = router
