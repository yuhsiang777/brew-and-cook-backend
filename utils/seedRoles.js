// utils/seedRoles.js
const { dataSource } = require('../db/data-source')

const seedRoles = async () => {
  const roleRepo = dataSource.getRepository('AdminRole')
  const roles = ['主要管理員', '次要管理員', '會員']

  for (const name of roles) {
    const exists = await roleRepo.findOne({ where: { name } })
    if (!exists) {
      await roleRepo.save(roleRepo.create({ name }))
      console.log(`✅ 已建立角色：${name}`)
    }
  }
}

module.exports = { seedRoles }
