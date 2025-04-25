// controllers/productController.js
const logger = require('../utils/logger')('Product')
const { dataSource } = require('../db/data-source')
const { sendErrorResponse, sendDataSuccessResponse } = require('../utils/resHandle');
const {
  isNotValidString,
  isUndefined
} = require('../utils/validUtils');

const getAllProducts = async (req, res) => {
  try {
    const productRepo = dataSource.getRepository('Product');

    // 解析查詢參數（具預設值）
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const keyword = req.query.keyword || '';
    const tagIds = req.query.tagIds ? req.query.tagIds.split(',').map(id => parseInt(id)) : [];

    const skip = (page - 1) * limit;

    // 動態建立查詢條件
    const queryBuilder = productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.tags', 'productTags')
      .leftJoinAndSelect('productTags.tag', 'tag') // 若關聯名稱為 tag
      .leftJoinAndSelect('product.inventoryLogs', 'inventoryLogs');

    // 搜尋產品名稱
    if (keyword) {
      queryBuilder.andWhere('product.name LIKE :keyword', { keyword: `%${keyword}%` });
    }

    // 篩選 Tag
    if (tagIds.length > 0) {
      queryBuilder.andWhere('tag.id IN (:...tagIds)', { tagIds });
    }

    // 加入分頁與排序
    queryBuilder.skip(skip).take(limit).orderBy('product.createdAt', 'DESC');

    const [products, total] = await queryBuilder.getManyAndCount();

    return sendDataSuccessResponse(res, {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      items: products
    }, '取得產品列表成功');

  } catch (err) {
    // 記錄錯誤
    logger.error({
      message: '取得產品列表失敗',
      error: err.message,
      stack: err.stack,
    });

    return sendErrorResponse(res, 500, '取得產品列表失敗', {
      error: err.message,
      stack: err.stack
    });
  }
}

const getProductById = async (req, res) => {
  try {
    const productRepo = dataSource.getRepository('Product');
    const id = parseInt(req.params.id);

    if (!isNotValidString(id) || !isUndefined(id)) {
      return sendErrorResponse(res, 400, '產品 ID 必須是數字');
    }

    const product = await productRepo.findOne({
      where: { id },
      relations: [
        'images',
        'tags',
        'tags.tag',
        'inventoryLogs'
      ]
    });

    if (!product) {
      return sendErrorResponse(res, 404, '查無此產品');
    }

    return sendDataSuccessResponse(res, product, '取得產品詳細資料成功');
  }
  catch (err) {
    logger.error({
      message: '取得單一產品時發生錯誤',
      error: err.message,
      stack: err.stack
    });
    return sendErrorResponse(res, 500, '取得產品失敗', {
      error: err.message,
      stack: err.stack
    });
  }
}

module.exports = {
  getAllProducts,
  getProductById
};