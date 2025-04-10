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
    product_id: {
      type: "uuid",
      nullable: false,
    },
    stockQuantity: {
      type: "integer",
      nullable: false,
    },
    quantityChanged: {
      type: "integer",
      nullable: false,
    },
    reason: {
      type: "varchar",
      length: 50,
      nullable: false
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    updatedAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
      nullable: false,
    },

  },
  relations: {
    product: {
      target: "Product",
      type: "many-to-one",
      joinColumn: { name: "product_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }
  }
})