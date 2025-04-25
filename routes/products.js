// 商品模組
/*
  商品 CRUD（對應 Products）
  產品分類（連動 Category）
  圖片上傳／刪除（ProductImages）
  標籤標記（連動 ProductTags, Tags）
*/

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// 取得產品列表
router.get('/', productController.getAllProducts);
// 取得產品單一資訊
router.get('/:id', productController.getProductById);

module.exports = router;