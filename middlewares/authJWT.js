const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // 取出 Bearer token

  if (!token) {
    return res.status(401).json({ message: '未登入，無權限存取' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 把解碼資料塞進 req 裡
    next(); // 放行給下一層 middleware 或 controller
  } catch (err) {
    return res.status(401).json({ message: 'Token 無效或已過期' });
  }
};