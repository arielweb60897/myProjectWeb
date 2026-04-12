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
const vocabulary = [
  { id: 1, word: "探る", pinin: "さぐる", mean: "探索" },
  { id: 2, word: "浮かれる", pinin: "うかれる", mean: "開心得意" },
  { id: 3, word: "浮つく", pinin: "うわつく", mean: "心浮氣躁" },
  { id: 4, word: "調子をこく", pinin: "ちょうしをこく", mean: "得意忘形" },
  { id: 5, word: "眼福", pinin: "がんぷく", mean: "眼福" },
];
router.get("/vocabulary", function (req, res) {
  console.log("GET vocabulary 被呼叫"); // 🔹 加 log
  res.json({ success: true, data: vocabulary });
});

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
//

module.exports = router;
