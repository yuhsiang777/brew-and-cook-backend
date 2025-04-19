const express = require('express')
const cors = require('cors')
const path = require('path')
const pinoHttp = require('pino-http')
const getLogger = require('./utils/logger') // 匯入函式
const logger = getLogger('API') // ✅ 呼叫它取得 logger 實例

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(pinoHttp({
  logger,
  serializers: {
    req(req) {
      req.body = req.raw?.body
      return req
    }
  }
}))

// Routes
app.get('/healthcheck', (req, res) => {
  res.status(200)
  res.send('OK')
})

// Error Handling
app.use((err, req, res, next) => {
  req.log.error(err)
  res.status(500).json({
    status: 'error',
    message: '伺服器錯誤'
  })
})

module.exports = app
