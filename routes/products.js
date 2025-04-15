// 商品模組
/*
  商品 CRUD（對應 Products）
  產品分類（連動 Category）
  圖片上傳／刪除（ProductImages）
  標籤標記（連動 ProductTags, Tags）
*/

// 表單驗證工具
const {
  isUndefined,
  // 檢查一個值是否為 undefined。
  isNotValidString,
  // 驗證一個值是否為非空字串。若值為空字串或非字串型別，返回 true。
  isNotValidInteger,
  // 驗證一個值是否為有效的正整數。若值不是數字、負數或非整數，返回 true。
  isNotValidUuid,
  // 驗證一個值是否為有效的 UUID 格式。若格式不符，返回 true。
  isNotValidEmail,
  // 驗證一個值是否為有效的電子郵件格式。若格式不符，返回 true。
  isNotValidPassword,
  // 驗證一個值是否符合密碼規範（包含數字、大寫字母、小寫字母，且長度 8 到 16 個字元）。若不符合，返回 true。
  isNotValidDate,
  // 驗證一個日期字串是否有效，格式為 YYYY-MM-DD。若無效，返回 true。
  isNotValidIsoDate,
  // 驗證一個日期字串是否為有效的 ISO 8601 格式（例如：2025-03-21T13:45:00Z）。若格式不符，返回 true。
  isValidHttpsUrl,
  // 驗證一個 URL 是否為有效的 HTTPS URL 格式。若符合，返回 true。
  isNotValidPositiveNumber,
  // 驗證一個值是否為正數。若值不是正數，返回 true。
  isNotValidJson
  // 驗證一個字串是否為有效的 JSON 格式。若無法解析為 JSON，返回 true。
} = require('../utils/validUtils');