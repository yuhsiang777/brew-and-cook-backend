const { dataSource } = require('../db/data-source');
const { seedRoles } = require('./seedRoles');
const logger = require('./logger')('initializer');

async function initializeDatabase() {
  try {
    await dataSource.initialize();
    logger.info('資料庫連線成功');
  } catch (error) {
    logger.error(`資料庫初始化失敗: ${error.message}`);
    throw error;
  }
}

async function seedRoles() {
  try {
    await seedRoles();
    logger.info('角色初始化完成');
  } catch (error) {
    logger.error(`角色初始化失敗: ${error.message}`);
    throw error;
  }
}

module.exports = { initializeDatabase, seedRoles };
