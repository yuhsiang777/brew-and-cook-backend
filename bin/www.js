#!/usr/bin/env node

/**
 * Module dependencies.
 */

const http = require('http');
const config = require('../config');
const app = require('../app');
const logger = require('../utils/logger')('www');
const { initializeDatabase, seedRoles } = require('../utils/initializer'); // 引入初始化功能

const port = config.get('web.port');
app.set('port', port);

const server = http.createServer(app);

server.on('error', (error) => handleError(error, port));

server.listen(port, async () => {
  try {
    await initializeDatabase();
    await seedRoles();
    logger.info(`伺服器運作中. port: ${port}`);
  } catch (error) {
    logger.error(`啟動失敗: ${error.message}`);
    process.exit(1);
  }
});

function handleError(error, port) {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      logger.error(`exception on ${bind}: ${error.code}`);
      process.exit(1);
  }
}

/*
const http = require('http')
const config = require('../config/index')
const app = require('../app') // 導入 app.js
const logger = require('../utils/logger')('www')
const { dataSource } = require('../db/data-source')
const { seedRoles } = require('../utils/seedRoles') // 引入 role 初始化腳本

const port = config.get('web.port')

app.set('port', port)

const server = http.createServer(app)

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }
  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`
  // handle specific listen errors
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      logger.error(`exception on ${bind}: ${error.code}`)
      process.exit(1)
  }
}

server.on('error', onError)

server.listen(port, async () => {
  try {
    // 初始化資料庫連線
    await dataSource.initialize()
    logger.info('資料庫連線成功')

    // 在資料庫連線成功後初始化角色
    await seedRoles()
    logger.info('角色初始化完成')

    logger.info(`伺服器運作中. port: ${port}`)
  } catch (error) {
    logger.error(`資料庫連線或角色初始化失敗: ${error.message}`)
    process.exit(1)
  }
})
*/