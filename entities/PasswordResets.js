const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({

  name: "PasswordReset",
  tableName: "PasswordResets",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
      nullable: false,
    },
    user_id: {
      type: "uuid",
      nullable: false,
    },
    resetToken: {
      type: "text", // 存儲 token，使用 text 類型以儲存長字符串
      nullable: false,
    },
    expiredAt: {
      type: "timestamp", // 存儲 token 失效時間，使用時間戳（timestamp）
      nullable: false,
    }
  },
  relations: {
    user: {
      target: "User", // 對應到 Users 資料表
      type: "many-to-one", // 多對一關係（多個密碼重設記錄對應一個使用者）
      joinColumn: { name: "user_id" }, // 指定外鍵欄位名稱
      onDelete: "CASCADE", // 刪除用戶時，自動刪除相關密碼重設記錄
      onUpdate: "CASCADE", // 更新用戶 ID 時，自動同步更新外鍵
    },
  }
})