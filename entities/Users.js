const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({

  name: "User",
  tableName: "Users",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
      nullable: false
    },
    name: {
      type: "varchar",
      length: 25,
      nullable: true
    },
    email: {
      type: "varchar",
      length: 250,
      unique: true, // 確保電子郵件唯一性
      nullable: false
    },
    password: {
      type: "varchar",
      length: 100,
      select: false, // 預設不查詢密碼欄位，提升安全性
      nullable: false,
    },
    phoneNumber: {
      type: "varchar",
      length: 20,
      nullable: true
    },
    address: {
      type: "varchar",
      length: 500,
      nullable: true
    },
    role_id: {
      type: "uuid",
      nullable: false,
    },
    // isEmailVerified
    isEmailVerified: {
      type: "boolean",
      default: false,
      nullable: false
    },
    // 軟刪除
    deletedAt: {
      type: "timestamp",
      nullable: true
    },
    lastLoginAt: {
      type: "timestamp",
      nullable: true
    },
    isActive: {
      type: "boolean",
      default: true, // 預設狀態
      nullable: false
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false
    },
    updatedAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
      nullable: false
    }
  },
  relations: {
    role: {
      target: "AdminRole",
      type: "many-to-one",
      joinColumn: { name: "role_id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    }
  }
})