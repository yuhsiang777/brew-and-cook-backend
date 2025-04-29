const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Users } = require('../entities/Users');
const { sendErrorResponse, sendAuthSuccessResponse } = require('../utils/resHandle');
const { AppDataSource } = require('../db/data-source');
const logger = require('../utils/logger');
require('dotenv').config();

const userRepository = AppDataSource.getRepository(Users);

const userController = {
  // 註冊方法
  async register(req, res) {
    try {
      const { email, password, name } = req.body;

      const existingUser = await userRepository.findOne({ where: { email } });

      if (existingUser) {
        return sendErrorResponse(res, 409, '此 Email 已註冊過');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = userRepository.create({
        email,
        password: hashedPassword,
        name
      });

      const savedUser = await userRepository.save(newUser);

      const token = jwt.sign(
        { id: savedUser.id, email: savedUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      logger.info(`使用者註冊成功：${email}`);

      return sendAuthSuccessResponse(res, {
        id: savedUser.id,
        email: savedUser.email,
        token
      });
    } catch (err) {
      logger.error(`註冊錯誤：${err.message}`);
      return sendErrorResponse(res, 500, '註冊失敗', { error: err.message });
    }
  },
  // 登入方法
  async signIn(req, res) {
    try {
      const { email, password } = req.body;

      const user = await userRepository.findOne({ where: { email } });

      if (!user) {
        return sendErrorResponse(res, 401, 'Email 或密碼錯誤');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return sendErrorResponse(res, 401, 'Email 或密碼錯誤');
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      logger.info(`使用者登入成功：${email}`);

      return sendAuthSuccessResponse(res, {
        id: user.id,
        email: user.email,
        token
      });

    } catch (err) {
      logger.error(`登入錯誤：${err.message}`);
      return sendErrorResponse(res, 500, '登入失敗', { error: err.message });
    }
  },
  // 登出方法
  async signOut(req, res) {
    try {
      // 對 JWT 認證來說，登出通常是交給前端清除 localStorage 中的 token
      logger.info(`使用者登出成功：${req.user?.email}`);
      return res.status(200).json({
        message: '登出成功',
        status: true,
        token: null
      })
    } catch (err) {
      logger.error(`登出錯誤：${err.message}`);
      return sendErrorResponse(res, 500, '登出失敗', { error: error.message });
    }
  }
}

module.exports = userController;
