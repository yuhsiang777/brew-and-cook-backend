// 使用者模組
/*
  註冊／登入
  帳戶狀態管理（啟用、停用）
  重設密碼（可呼叫 PasswordResets）
  角色指派（對應 AdminRoles）
*/

// 模組匯入區
const express = require('express'); // 建立 Router
const bcrypt = require('bcrypt');   // 密碼加密用
const router = express.Router();    // 建立路由實例
const jwt = require('jsonwebtoken');


const { dataSource } = require('../db/data-source');
// 連接資料庫用的 DataSource 實例

const logger = require('../utils/logger')('User');
// 建立此模組專用的 logger 實例

// 表單驗證工具
const {
  isUndefined,
  // 檢查一個值是否為 undefined。
  isNotValidString,
  // 驗證一個值是否為非空字串。若值為空字串或非字串型別，返回 true。
  isNotValidEmail,
  // 驗證一個值是否為有效的電子郵件格式。若格式不符，返回 true。
  isNotValidPassword,
  // 驗證一個值是否符合密碼規範（包含數字、大寫字母、小寫字母，且長度 8 到 16 個字元）。若不符合，返回 true。
} = require('../utils/validUtils');

// 回應處理封裝
const {
  sendErrorResponse,
  sendSuccessResponse
} = require('../utils/resHandle');

const saltRounds = 10; // Bcrypt 次數

// POST - 註冊新帳號
router.post('/sign-up', async (req, res, next) => {
  try {
    // 接收資料
    const { email, password } = req.body;

    // 欄位基本驗證
    if (
      isUndefined(email) || isUndefined(password) ||
      isNotValidString(email) || isNotValidString(password) ||
      isNotValidEmail(email) || isNotValidPassword(password)
    ) {
      logger.warn('請求錯誤，請檢查輸入的資料格式');
      return sendErrorResponse(res, 400, '請求錯誤，請檢查輸入的資料格式');
    }

    const userRepo = dataSource.getRepository('Users');

    // 檢測是否有帳號註冊
    const existUser = await userRepo.findOne({ where: { email } });

    if (existUser) {
      logger.warn('使用者已存在，請嘗試其他電子信箱。');
      return sendErrorResponse(res, 409, '使用者已存在，請嘗試其他電子信箱。');
    }

    // 密碼加密處理
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // 建立新使用者
    const newUser = userRepo.create({
      email,
      password: hashPassword,
      role: { id: 3 }, // 對應 Role_id 內 'USER' 的角色 ID
      isActive: true,
    });

    const result = await userRepo.save(newUser);

    // 建立 JWT token
    const token = jwt.sign(
      { userId: result.id, email: result.email, roleId: 3 },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    logger.info(`註冊成功，使用者 ID: ${result.id}`);

    // 回傳訊息
    return sendSuccessResponse(res, {
      userId: result.id,
      email: result.email,
      token
    }, '註冊成功');

  } catch (error) {
    logger.error('建立使用者錯誤:', error);
    next(error);
  }
})