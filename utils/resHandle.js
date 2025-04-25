// 統一的錯誤回應函數
const sendErrorResponse = (res, status = 500, message = '發生錯誤', errorData = {}) => {
  res.status(status).json({
    message,
    status: false, // 表示失敗
    error: errorData // 如果有詳細錯誤資訊可放這裡（如 err.message, err.stack）
  });
};

// 統一的成功回應函數（適合登入/註冊使用）
const sendAuthSuccessResponse = (res, data = {}, message = '成功') => {
  // 過濾掉密碼資訊（避免洩漏）
  if (data.user) {
    delete data.user.password;
  }

  res.status(200).json({
    message,
    status: true, // 表示成功
    data: {
      userId: data.id,   // 或 data.user.id
      email: data.email,
      token: data.token
    }
  });
};

// 一般資料查詢成功（如：產品列表、用戶列表）
const sendDataSuccessResponse = (res, data = {}, message = '成功', statusCode = 200) => {
  res.status(statusCode).json({
    message,
    status: true,
    data
  });
};

module.exports = {
  sendErrorResponse,
  sendAuthSuccessResponse,
  sendDataSuccessResponse
};
