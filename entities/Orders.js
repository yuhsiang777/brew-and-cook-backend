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
      length: "50",
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
  constraints: [
    {
      name: "fk_user_id",  // 外鍵約束名稱
      type: "foreign key",  // 外鍵類型
      columnNames: ["users_id"],  // 參照的欄位
      referencedTableName: "Users",  // 被參照的表格
      referencedColumnNames: ["id"],  // 被參照的欄位
      onDelete: "CASCADE",  // 當刪除用戶時，對應訂單也會被刪除
      onUpdate: "CASCADE"  // 當更新用戶的 id 時，訂單中的 users_id 也會隨之更新
    },
    {
      name: "fk_cart_id",  // 外鍵約束名稱
      type: "foreign key",  // 外鍵類型
      columnNames: ["cart_id"],  // 參照的欄位
      referencedTableName: "Cart",  // 被參照的表格
      referencedColumnNames: ["id"],  // 被參照的欄位
      onDelete: "CASCADE",  // 當刪除對應的購物車時，訂單也會被刪除
      onUpdate: "CASCADE"  // 當更新購物車的 id 時，訂單中的 cart_id 也會更新
    },
    {
      name: "fk_product_id",  // 外鍵約束名稱
      type: "foreign key",
      columnNames: ["product_id"],
      referencedTableName: "Products",
      referencedColumnNames: ["id"],
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    {
      name: "fk_discount_id",
      type: "foreign key",
      columnNames: ["discount_id"],
      referencedTableName: "Discounts",
      referencedColumnNames: ["id"],
      onDelete: "SET NULL",  // 如果折扣被刪除，則將訂單中的 discount_id 設為 NULL
      onUpdate: "CASCADE"
    },
    {
      name: "fk_paymentMethod_id",
      type: "foreign key",
      columnNames: ["paymentMethod_id"],
      referencedTableName: "PaymentMethods",
      referencedColumnNames: ["id"],
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    {
      name: "fk_shippingMethod_id",
      type: "foreign key",
      columnNames: ["shippingMethod_id"],
      referencedTableName: "ShippingMethods",
      referencedColumnNames: ["id"],
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    {
      name: "fk_status_id",
      type: "foreign key",
      columnNames: ["status_id"],
      referencedTableName: "OrderStatus",
      referencedColumnNames: ["id"],
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }
  ]
})
