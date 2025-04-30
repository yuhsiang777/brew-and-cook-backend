const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { User } = require('../entities/Users');
const { PasswordReset } = require('../entities/PasswordResets');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/resHandle');
const { sendPasswordResetEmail } = require('../utils/mail'); // 假設你有個發郵件的工具

// 發送密碼重設請求 - 用戶提供電子郵件，系統發送重設鏈接
async function forgotPassword(req, res) {
  const { email } = req.body;

  // 檢查用戶是否存在
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return sendErrorResponse(res, 404, '找不到此電子郵件的使用者');
  }

  // 生成重設密碼的 token
  const resetToken = crypto.randomBytes(20).toString('hex'); // 隨機生成 20 字元長的 token

  // 設定重設 token 的過期時間
  const expirationTime = new Date();
  expirationTime.setHours(expirationTime.getHours() + 1); // 設定 1 小時過期

  // 儲存 token 到資料庫
  await PasswordReset.create({
    users_id: user.id,
    resetToken,
    expiredAt: expirationTime,
  });

  // 發送重設密碼的郵件 (你需要有發郵件的工具)
  const resetLink = `http://yourapp.com/reset-password?token=${resetToken}`;
  sendPasswordResetEmail(user.email, resetLink);

  return sendSuccessResponse(res, '重設密碼郵件已發送');
}

// 重設密碼 - 用戶提供新密碼和 resetToken
async function resetPassword(req, res) {
  const { resetToken, newPassword } = req.body;

  // 找到重設 token 記錄
  const resetRecord = await PasswordReset.findOne({ where: { resetToken } });

  if (!resetRecord) {
    return sendErrorResponse(res, 400, '無效的重設 token');
  }

  // 檢查 token 是否過期
  if (new Date() > resetRecord.expiredAt) {
    return sendErrorResponse(res, 400, '重設 token 已過期');
  }

  // 找到用戶並更新密碼
  const user = await User.findOne({ where: { id: resetRecord.users_id } });
  if (!user) {
    return sendErrorResponse(res, 404, '用戶不存在');
  }

  // 更新密碼
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  // 刪除已使用的重設 token
  await PasswordReset.destroy({ where: { resetToken } });

  return sendSuccessResponse(res, '密碼已成功重設');
}

module.exports = { forgotPassword, resetPassword };
