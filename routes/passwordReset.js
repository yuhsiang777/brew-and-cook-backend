const express = require('express');
const router = express.Router();
const passwordResetController = require('../controllers/passwordResetController');

// 路由 - 發送密碼重設請求
router.post('/forgot-password', passwordResetController.forgotPassword);

// 路由 - 重設密碼
router.post('/reset-password', passwordResetController.resetPassword);

module.exports = router;
