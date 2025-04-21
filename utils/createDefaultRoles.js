// scripts/createDefaultRoles.js
const { dataSource } = require('../db/data-source')

const createDefaultRoles = async () => {
  const roleRepo = dataSource.getRepository('AdminRole')

  try {
    const existingRoles = await roleRepo.find()

    if (existingRoles.length === 0) {
      const roles = [
        { name: '主要管理員' },
        { name: '次要管理員' },
        { name: '會員' }
      ]
      await roleRepo.save(roles)
      console.log('已建立預設角色')
    } else {
      console.log('預設角色已存在')
    }
  } catch (error) {
    console.error('創建角色時出錯', error)
  }
}

module.exports = createDefaultRoles
