// scripts/createDefaultRoles.js
const logger = require('./logger')('RoleSetup');
const { dataSource } = require('../db/data-source')

const createDefaultRoles = async () => {
  const roleRepo = dataSource.getRepository('AdminRole')

  try {
    // 檢查是否已有角色
    const existingRoles = await roleRepo.find();

    if (existingRoles.length === 0) {
      const roles = [
        { name: '主要管理員' },
        { name: '次要管理員' },
        { name: '會員' }
      ];

      // 儲存預設角色
      await roleRepo.save(roles);
      logger.info('已建立預設角色');  // 使用 logger 記錄成功訊息
    } else {
      logger.info('預設角色已存在');  // 使用 logger 記錄已有角色的訊息
    }
  } catch (error) {
    // 捕捉錯誤並使用 logger 記錄
    logger.error({
      message: '創建角色時出錯',
      error: error.message,  // 錯誤訊息
      stack: error.stack     // 錯誤堆疊追蹤
    });
    // 若需要，也可以重新拋出錯誤
    throw error;
  }
};

module.exports = createDefaultRoles
