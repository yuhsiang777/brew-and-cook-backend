// routes/users.js
const express = require('express')
const router = express.Router()

const { register, signIn } = require('../controllers/userController')

// 註冊 API
router.post('/sign-up', register)
router.post('/sign-in', signIn)

module.exports = router
