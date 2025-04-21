// routes/users.js
const express = require('express')
const router = express.Router()

const { register } = require('../controllers/userController')

// 註冊 API
router.post('/sign-up', register)

module.exports = router
