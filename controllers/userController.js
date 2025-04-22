// POST - 註冊新帳號
const { dataSource } = require('../db/data-source')
const bcrypt = require('bcrypt')
const logger = require('../utils/logger')('User')
const {
  isNotValidEmail,
  isNotValidPassword,
  isNotValidString
} = require('../utils/validUtils')

const saltRounds = 10

const register = async (req, res) => {
  const { email, password, name } = req.body

  if (isNotValidEmail(email)) {
    return res.status(400).json({ message: 'Email 格式錯誤' })
  }
  if (isNotValidPassword(password)) {
    return res.status(400).json({ message: '密碼格式錯誤' })
  }
  if (isNotValidString(name)) {
    return res.status(400).json({ message: '名稱不得為空' })
  }

  try {
    const userRepo = dataSource.getRepository('User')
    const roleRepo = dataSource.getRepository('AdminRole')

    const existingUser = await userRepo.findOne({ where: { email } })

    if (existingUser) {
      return res.status(409).json({ message: '這個 Email 已被註冊' })
    }

    const memberRole = await roleRepo.findOne({ where: { name: '會員' } })
    console.log('🧩 找到的會員角色:', memberRole)

    if (!memberRole) {
      return res.status(500).json({ message: '找不到「會員」角色' })
    }

    // 密碼加密
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // 建立新用戶並分配查詢到的「會員」角色 ID
    const user = userRepo.create({
      name,
      email,
      password: hashedPassword,
      role: memberRole // 使用查詢到的會員角色 ID
    })
    console.log('📦 準備儲存的使用者:', user)
    
    await userRepo.save(user)

    return res.status(201).json({ message: '註冊成功！' })
  } catch (err) {
    logger.error('註冊錯誤', { message: err.message, stack: err.stack })
    console.error('🔴 註冊錯誤詳細資訊:', err) // 要能看到完整錯誤內容
    return res.status(500).json({ message: '伺服器錯誤，註冊失敗' })
  }
}

module.exports = { register }
