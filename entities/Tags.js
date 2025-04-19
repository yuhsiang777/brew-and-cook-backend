const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: "Tag",
  tableName: "Tags",
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
      unique: true,
      nullable: false
    },
    description: {
      type: "varchar",
      length: 50,
      nullable: false
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    isActive: {
      type: "boolean",
      default: true, // 預設狀態
      nullable: false
    },
  },
  relations: {
    productTags: {
      target: "ProductTag",  // 這是指向與 Tag 相關的 ProductTag 實體名稱
      type: "one-to-many",  // 表示這是一對多關聯
      cascade: true,  // 這個配置確保了與該 Tag 相關的 ProductTag 能夠一起處理
      inverseSide: "tag" // 假設 ProductTag 實體中有一個 `tag` 欄位對應於 Tag
    },
  }
});
