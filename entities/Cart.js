const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: "Cart",
  tableName: "Carts",
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
    product_id: {
      type: "uuid",
      nullable: false,
    },
    quantity: {
      type: "integer",
      nullable: false,
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
    user: {
      target: "User",
      type: "many-to-one",
      joinColumn: { name: "users_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    product: {
      target: "Product",
      type: "many-to-one",
      joinColumn: { name: "product_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }
  }
})
