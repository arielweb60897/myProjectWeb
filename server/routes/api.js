var express = require("express");
var router = express.Router();

// 假資料
const products = [
  { id: 1, name: "美式咖啡", price: 90 },
  { id: 2, name: "拿鐵咖啡", price: 120 },
  { id: 3, name: "卡布奇諾", price: 150 },
  { id: 4, name: "摩卡咖啡", price: 180 },
  { id: 5, name: "焦糖瑪奇朵", price: 180 },
];
// GET /api/products
router.get("/products", function (req, res) {
  console.log("GET /products 被呼叫"); // 🔹 加 log
  res.json({ success: true, data: products });
});

// POST /api/products
router.post("/products", function (req, res) {
  console.log("POST /products 被呼叫", req.body); // 🔹 加 log
  const newProduct = req.body;
  newProduct.id = products.length + 1;
  products.push(newProduct);
  res.status(201).json({ success: true, data: newProduct });
});

module.exports = router;
