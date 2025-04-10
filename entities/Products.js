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
      length: 50,
      unique: true,
      nullable: false
    },
    description: {
      type: "varchar",
      length: 500,
      nullable: false
    },
    price: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: false,
    },
    category_id: {
      type: "uuid",
      nullable: true,
    },
    weight: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: false,
    },
    dimensions: {
      type: "varchar",
      length: 20,
      nullable: false
    },
    isActive: {
      type: "boolean",
      default: false, // 預設狀態
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
    category: {
      target: "Category",
      type: "many-to-one",
      joinColumn: { name: "category_id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    },
    productTag: {
      target: "ProductTag", // 使用中间表 ProductTag 实体
      type: "one-to-many", 
      cascade: true, // 允許自動保存中間表記錄
    }
  }

})