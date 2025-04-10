const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: "ProductImage",
  tableName: "ProductImages",
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
    image_url: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    isPrimary: {
      type: "boolean",
      default: true, // 預設狀態
    },
    description: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
  },
  relations: {
    target: "Products",
    type: "many-to-one",
    joinColumn: { name: "product_id" },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  }
})