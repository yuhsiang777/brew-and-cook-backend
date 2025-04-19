const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: "ProductTag",
  tableName: "ProductTags",
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
    tag_id: {
      type: "uuid",
      nullable: false,
    },
  },
  relations: {
    product: {
      target: "Product",
      type: "many-to-one",
      joinColumn: { name: "product_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    tag: {
      target: "Tag",
      type: "many-to-one",
      joinColumn: { name: "tag_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  }
});
