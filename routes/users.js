// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// Middlewares
const { validateRegister, validateLogin } = require('../middlewares/validateUser');
const authJWT = require('../middlewares/authJWT');




// Users - 註冊 API
router.post('/sign-up', validateRegister, userController.register)
// Users - 登入 API
router.post('/sign-in', validateLogin, userController.signIn)
// Users - 登出 API
router.post('/sign-out', authJWT, userController.signOut)



module.exports = router
