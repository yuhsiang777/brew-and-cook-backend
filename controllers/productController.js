// controllers/productController.js
const logger = require('../utils/logger')('Product')
const { dataSource } = require('../db/data-source')
const { resHandle } = require('../utils/resHandle')

const getAllProducts = async (req, res) => {
  try {
    const productRepo = dataSource.getRepository('Product');

    // 查詢所有產品（可加入後續分頁、排序、篩選邏輯）
  } catch {
    const products = await productRepo.find({
      relations: ['images', 'tags', 'inventoryLogs'],
      order: { createdAt: 'DESC' },
    });
  }
}