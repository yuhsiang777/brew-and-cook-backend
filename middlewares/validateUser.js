// middlewares/validateUser.js
const { sendErrorResponse, sendAuthSuccessResponse } = require('../utils/resHandle');
const {
  isNotValidEmail,
  isNotValidPassword,
  isNotValidString,
  isUndefined
} = require('../utils/validUtils');

// 驗證註冊資料
function validateRegister(req, res, next) {
  const { email, password, name } = req.body

  // 驗證輸入
  if (
    isUndefined(email) || isUndefined(password) || isUndefined(name) ||
    isNotValidString(email) || isNotValidString(password) || isNotValidString(name)
  ) {
    return sendErrorResponse(res, 400, '欄位不得為空或格式錯誤');
  }

  if (isNotValidEmail(email)) {
    return sendErrorResponse(res, 400, 'Email 格式錯誤');
  }

  if (isNotValidPassword(password)) {
    return sendErrorResponse(res, 400, '密碼格式錯誤，需包含大小寫與數字，長度 8~16');
  }

  next();
}

// 驗證登入資料
function validateLogin(req, res, next) {
  const { email, password } = req.body

  if (isUndefined(email) || isUndefined(password)) {
    return sendErrorResponse(res, 400, '請填寫 Email 與密碼');
  }

  if (isNotValidString(email) || isNotValidString(password)) {
    return sendErrorResponse(res, 400, '欄位不得為空白');
  }
  // 驗證 email 格式
  if (isNotValidEmail(email)) {
    return sendErrorResponse(res, 400, '請輸入有效的 Email 地址');
  }

  // 驗證密碼格式
  if (isNotValidPassword(password)) {
    return sendErrorResponse(res, 400, '密碼格式錯誤，需包含大小寫字母和數字，長度 8~16');
  }

  next();
}

module.exports = { validateRegister, validateLogin };