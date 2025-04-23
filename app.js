const express = require('express');
const cors = require('cors');
const path = require('path');
const pinoHttp = require('pino-http');
const getLogger = require('./utils/logger');  // 引入 logger
const logger = getLogger('API');  // 用 'API' 作為前綴

const createDefaultRoles = require('./utils/createDefaultRoles');  // 創建角色的函數
const usersRouter = require('./routes/users');  // 用戶路由

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(pinoHttp({
  logger,
  serializers: {
    req(req) {
      req.body = req.raw?.body;
      return req;
    }
  }
}));

// Routes
app.get('/healthcheck', (req, res) => {
  res.status(200);
  res.send('OK');
});

app.use('/api/users', usersRouter);

// 在應用啟動時創建預設角色
createDefaultRoles();

// 錯誤處理
app.use((err, req, res, next) => {
  // 使用 pino 記錄詳細的錯誤
  req.log.error({
    err,                  // 錯誤對象
    message: err.message,  // 錯誤訊息
    stack: err.stack,      // 堆疊追蹤
    method: req.method,    // 請求方法
    url: req.originalUrl,  // 請求的 URL
  }, 'Unhandled error occurred');

  // 根據環境選擇錯誤回應
  if (process.env.NODE_ENV === 'development') {
    res.status(500).json({
      status: 'error',
      message: err.message,
      stack: err.stack,  // 顯示堆疊追蹤（開發環境）
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: '伺服器錯誤，請稍後再試。',
    });
  }
});

module.exports = app;
