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
      enum: ["主要管理員", "次要管理員"],
      nullable: false
    }
  },
  constraints: [
    {
      name: "role_name_check",
      type: "check",
      expression: `"name" IN ("主要管理員", "次要管理員")`
    }
  ]
})