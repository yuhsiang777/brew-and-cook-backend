const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({

  name: "Product",
  tableName: "Products",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
      nullable: false,
    },
    name: {
      type: "varchar",
      length: 10,
      nullable: false
    },
    description: {
      type: "varchar",
      length: 50,
      nullable: false
    },
  }
})