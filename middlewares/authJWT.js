// middlewares/authJWT.js
const jwt = require('jsonwebtoken');
const { sendErrorResponse } = require('../utils/resHandle');
require('dotenv').config(); // 讀取 JWT_SECRET

function authJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendErrorResponse(res, 401, '未提供有效的授權資訊');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],      // 明確指定算法
      clockTolerance: 15,         // 允許15秒時差
      maxAge: '7d'                // 強制過期時間
    });
    req.user = decoded; // 把解析後的 user 放進 req 裡
    next(); // 通過驗證，進入下一層
  } catch (error) {
    return sendErrorResponse(res, 403, 'JWT 驗證失敗或過期', { error: error.message });
  }
}

module.exports = authJWT;