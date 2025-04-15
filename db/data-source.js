const { DataSource } = require('typeorm');
const fs = require('fs');
const path = require('path');
const config = require('../config/index');

const entitiesDir = path.join(__dirname, '../entities');

const entities = fs
  .readdirSync(entitiesDir) // 定義了資料庫實體所在的目錄
  .filter(file => file.endsWith('.js')) // 過濾掉不是 .js 格式的檔案，只保留 JavaScript 檔案
  .map(file => require(path.join(entitiesDir, file))); // 這些模組是 TypeORM 中的實體定義，代表資料庫的表。

const dataSource = new DataSource({
  type: 'postgres',
  host: config.get('db.host'),
  port: Number(config.get('db.port')),
  username: config.get('db.username'),
  password: config.get('db.password'),
  database: config.get('db.database'),
  synchronize: config.get('db.synchronize') === 'true',
  ssl: config.get('db.ssl') === 'true',
  poolSize: 10,
  entities,
});

module.exports = { dataSource };

/*const config = require('../config/index');

const AdminRole = require('../entities/AdminRoles');
const Cart = require('../entities/Carts');
const Category = require('../entities/Categories');
const Discounts = require('../entities/Discounts');
const InventoryLog = require('../entities/InventoryLogs');
const Order = require('../entities/Orders');
const OrderStatus = require('../entities/OrderStatuses');
const PasswordReset = require('../entities/PasswordResets');
const PaymentMethod = require('../entities/PaymentMethods');
const ProductImage = require('../entities/ProductImages');

const Product = require('../entities/Products');
const ProductTag = require('../entities/ProductTags');
const ShippingMethod = require('../entities/ShippingMethods');
const Tag = require('../entities/Tags');
const User = require('../entities/Users');


const dataSource = new DataSource({
  type: 'postgres',
  host: config.get('db.host'),
  port: config.get('db.port'),
  username: config.get('db.username'),
  password: config.get('db.password'),
  database: config.get('db.database'),
  synchronize: config.get('db.synchronize') === 'true',
  poolSize: 10,
  entities: [
    AdminRole,
    Cart,
    Category,
    Discounts,
    InventoryLog,
    Order,
    OrderStatus,
    PasswordReset,
    PaymentMethod,
    ProductImage,
    Product,
    ProductTag,
    ShippingMethod,
    Tag,
    User
  ],
  ssl: config.get('db.ssl') === 'true'
})

module.exports = { dataSource };
*/