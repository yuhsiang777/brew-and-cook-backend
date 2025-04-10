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
    relations: {
      // 與中間表 ProductTags 的一對多關係
      productTags: {
        target: "ProductTag",
        type: "one-to-many",
        cascade: true, 
      },
    }
  }
})