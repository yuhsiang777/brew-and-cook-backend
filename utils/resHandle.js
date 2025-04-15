// 統一的錯誤回應函數
const sendErrorResponse = (res, status = 500, message = '發生錯誤', errorData = {}) => {
  res.status(status).json({
    message,
    status: false,
    error: errorData // 如果有詳細錯誤資訊可放這裡
  });
};

// 統一的成功回應函數
const sendSuccessResponse = (res, data = {}, message = '成功') => {
  // 過濾掉密碼資訊
  if (data.user) {
    delete data.user.password;
  }
  res.status(200).json({
    message,
    status: true,
    data: {
      userId: data.id, // 注意這裡使用了 userId，並且將 `id` 改為 `userId`
      email: data.email,
      token: data.token
    }
  });
};

module.exports = {
  sendErrorResponse,
  sendSuccessResponse
};