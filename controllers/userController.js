// POST - 註冊新帳號
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')  // 假設你會用 JWT 驗證
const { dataSource } = require('../db/data-source')
const logger = require('../utils/logger')('User')
const {
  isNotValidEmail,
  isNotValidPassword,
  isNotValidString,
  isUndefined
} = require('../utils/validUtils')

const saltRounds = 10

// 註冊方法
const register = async (req, res) => {
  const { email, password, name } = req.body;

  // 驗證輸入
  if (
    isUndefined(email) || isUndefined(password) || isUndefined(name) ||
    isNotValidString(email) || isNotValidString(password) || isNotValidString(name)
  ) {
    return res.status(400).json({ message: '格式錯誤' });
  }
  if (isNotValidEmail(email)) {
    return res.status(400).json({ message: 'Email 格式錯誤' });
  }
  if (isNotValidPassword(password)) {
    return res.status(400).json({ message: '密碼格式錯誤' });
  }
  if (isNotValidString(name)) {
    return res.status(400).json({ message: '名稱不得為空' });
  }

  try {
    const userRepo = dataSource.getRepository('User')
    const roleRepo = dataSource.getRepository('AdminRole')

    // 檢查是否有重複的 email
    const existingUser = await userRepo.findOne({ where: { email } })
    if (existingUser) {
      logger.info(`重複註冊的 Email: ${email}`)
      return res.status(409).json({ message: '這個 Email 已被註冊' })
    }

    // 查詢角色
    const memberRole = await roleRepo.findOne({ where: { name: '會員' } })
    if (!memberRole) {
      // 若找不到角色，則記錄詳細錯誤並返回 500
      logger.error(`找不到「會員」角色，Email: ${email}, Name: ${name}`)
      return res.status(500).json({ message: '找不到「會員」角色，請聯絡管理員' })
    }

    // 密碼加密
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // 創建新用戶
    const user = userRepo.create({
      name,
      email,
      password: hashedPassword,
      role: memberRole // 分配角色
    })

    // 儲存用戶資料
    await userRepo.save(user)
    logger.info(`新用戶註冊成功: ${email}`)

    return res.status(201).json({ message: '註冊成功！' })
  } catch (err) {
    // 記錄錯誤
    logger.error({
      message: '註冊過程中出錯',
      error: err.message,
      stack: err.stack,
      email,  // 記錄 email 和 name，便於追蹤
      name    // 記錄 name，便於追蹤
    })

    // 在開發環境中，繼續顯示錯誤訊息給開發者，生產環境可以略過
    console.error('註冊錯誤詳細資訊:', err)

    return res.status(500).json({ message: '伺服器錯誤，註冊失敗' })
  }
}

// 登入方法
const signIn = async (req, res) => {
  const { email, password } = req.body;

  // 驗證輸入
  if (
    isUndefined(email) || isUndefined(password) ||
    isNotValidString(email) || isNotValidString(password)
  ) {
    return res.status(400).json({ message: '格式錯誤' })
  }
  if (isNotValidEmail(email)) { return res.status(400).json({ message: 'Email 格式錯誤' }) }
  if (isNotValidPassword(email)) { return res.status(400).json({ message: '密碼格式錯誤' }) }

  try {
    const userRepo = dataSource.getRepository('User');


    const existingUser = await userRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!existingUser) { // 比對 Email 是否正確
      return res.status(401).json({ message: '帳號或密碼錯誤' });
    }

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) { // 比對 密碼 是否正確
      return res.status(401).json({ message: '帳號或密碼錯誤' });
    }

    // 檢查帳號狀態
    if (!existingUser.isActive || existingUser.deletedAt) {
      return res.status(403).json({ message: '此帳號已停用' });
    }

    // 更新最後登入時間
    existingUser.lastLoginAt = new Date();
    await userRepo.save(existingUser);

    // 簽發 JWT Token（可依你需求擴充 payload）
    const token = jwt.sign(
      { userId: existingUser.id, role: existingUser.role_id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: '登入成功',
      token,
      user: {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
      },
    });

  } catch (err) {
    // 記錄錯誤
    logger.error({
      message: '登入過程中出錯',
      error: err.message,
      stack: err.stack,
      email,  // 記錄 email ，便於追蹤
    })

    // 在開發環境中，繼續顯示錯誤訊息給開發者，生產環境可以略過
    console.error('登入錯誤詳細資訊:', err)

    return res.status(500).json({ message: '伺服器錯誤，登入失敗' })
  }
}


module.exports = { register }
