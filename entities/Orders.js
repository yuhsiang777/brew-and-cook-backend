const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({

  name: "Order",
  tableName: "Orders",
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
    cart_id: {
      type: "uuid",
      nullable: false,
    },
    trackingNumber: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    subtotal: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: false,
    },
    discount_id: {
      type: "uuid",
      nullable: true,
    },
    discountApplied: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: false,
    },
    totalAmount: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: false,
    },
    paymentMethod_id: {
      type: "uuid",
      nullable: false,
    },
    paymentStatus: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    shippingMethod_id: {
      type: "uuid",
      nullable: false,
    },
    shippingAddress: {
      type: "varchar",
      length: "250",
      nullable: false,
    },
    status_id: {
      type: "uuid",
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
    cart: {
      target: "Cart",
      type: "one-to-one",
      joinColumn: { name: "cart_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    discount: {
      target: "Discount",
      type: "many-to-one",
      joinColumn: { name: "discount_id" },
      nullable: true,
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    },
    paymentMethod: {
      target: "PaymentMethod",
      type: "many-to-one",
      joinColumn: { name: "paymentMethod_id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    },
    shippingMethod: {
      target: "ShippingMethod",
      type: "many-to-one",
      joinColumn: { name: "shippingMethod_id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    },
    status: {
      target: "OrderStatus",
      type: "many-to-one",
      joinColumn: { name: "status_id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    }
  }
})
