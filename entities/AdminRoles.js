const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({

  name: "AdminRole",
  tableName: "AdminRoles",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
      nullable: false,
    },
    name: {
      type: "enum",
      enum: ["主要管理員", "次要管理員", "會員"],
      nullable: false
    }
  },
  relations: {
    users: {
      target: "User",
      type: "one-to-many",
      inverseSide: "role"
    }
  }
})