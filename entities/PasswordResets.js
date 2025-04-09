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
    users_id: {
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
  constraints: [
    {
      name: "fk_user_id",  // 外鍵約束名稱
      type: "foreign key",  // 外鍵類型
      columnNames: ["users_id"],  // 參照的欄位，即 PasswordResets 表中的 users_id
      referencedTableName: "Users",  // 被參照的表格，即 Users 表
      referencedColumnNames: ["id"],  // 被參照的欄位，即 Users 表中的 id
      onDelete: "CASCADE",  // 當刪除對應的用戶時，密碼重設記錄也會被刪除
      onUpdate: "CASCADE"  // 當更新用戶的 id 時，PasswordResets 中的 users_id 也會隨之更新
    }
  ]
})