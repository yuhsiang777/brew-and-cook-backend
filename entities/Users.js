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
      nullable: false
    },
    email: {
      type: "varchar",
      length: 250,
      unique: true,
      nullable: false
    },
    password: {
      type: "varchar",
      length: 80,
      select: false, // 密碼欄位不顯示
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
      foreignKey: {
        name: "role_id_fk",
        columnNames: ["role_id"],
        referencedTableName: "AdminRoles",
        referencedColumnName: ["id"]
      }
    },
    lastLoginAt: {
      type: "timestamp",
      nullable: true
    },
    isActive: {
      type: "boolean",
      default: true,
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
})