// middlewares/validateUser.js
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
    return res.status(400).json({ message: '欄位不得為空或格式錯誤' })
  }

  if (isNotValidEmail(email)) {
    return res.status(400).json({ message: 'Email 格式錯誤' })
  }

  if (isNotValidPassword(password)) {
    return res.status(400).json({ message: '密碼格式錯誤，需包含大小寫與數字，長度 8~16' })
  }

  next()
}

// 驗證登入資料
function validateLogin(req, res, next) {
  const { email, password } = req.body

  if (isUndefined(email) || isUndefined(password)) {
    return res.status(400).json({ message: '請填寫 Email 與密碼' });
  }

  if (isNotValidString(email) || isNotValidString(password)) {
    return res.status(400).json({ message: '欄位不得為空白' });
  }

  if (isNotValidEmail(email)) {
    return res.status(400).json({ message: '請輸入有效的 Email 地址' });
  }

  next();
}

module.exports = { validateRegister, validateLogin };