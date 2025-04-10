const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({

  name: "InventoryLog",
  tableName: "InventoryLogs",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
      nullable: false,
    },
    code: {
      type: "varchar",
      length: 10,
      nullable: false,
    },
    value: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: false,
    },
    description: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    startDate: {
      type: "timestamp",
      nullable: false,
    },
    endDate: {
      type: "timestamp",
      nullable: false,
    }
  },
})