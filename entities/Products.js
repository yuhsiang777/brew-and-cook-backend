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
    category_id: {
      type: "uuid",
      nullable: true,
    },
    price: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: false,
    },
    colors: {
      type: "simple-json",
      nullable: true,
      comment: "產品可選擇的顏色，例如：[\"紅\", \"白\", \"黑\"]"
    },
    specs: {
      type: "simple-json",
      nullable: true,
      comment: "產品規格，例如：{\"容量\":\"500ml\", \"功率\":\"1000W\"}"
    },
    size: {
      type: "varchar",
      length: 50,
      nullable: true,
    },
    description: {
      type: "varchar",
      length: 500,
      nullable: false
    },
    materials: {
      type: "varchar",
      length: 100,
      nullable: true,
    },
    warranty: {
      type: "varchar",
      length: 20,
      nullable: true,
    },
    origin: {
      type: "varchar",
      length: 20,
      nullable: true,
    },
    notices: {
      type: "simple-json",
      nullable: true,
      comment: "注意事項，例如：[\"請遠離火源\", \"不可水洗\"]"
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