var express = require("express");
var router = express.Router();
console.log("api router loaded");
const products = [
  { id: 1, name: "美式咖啡", price: 90 },
  { id: 2, name: "拿鐵咖啡", price: 120 },
  { id: 3, name: "卡布奇諾", price: 150 },
  { id: 4, name: "摩卡咖啡", price: 180 },
  { id: 5, name: "焦糖瑪奇朵", price: 180 },
];
// const vocabulary = [
//   { id: 1, word: "探る", romaji: "さぐる", mean: "探索" },
//   { id: 2, word: "浮かれる", romaji: "うかれる", mean: "開心得意" },
//   { id: 3, word: "浮つく", romaji: "うわつく", mean: "心浮氣躁" },
//   { id: 4, word: "調子をこく", romaji: "ちょうしをこく", mean: "得意忘形" },
//   { id: 5, word: "眼福", romaji: "がんぷく", mean: "眼福" },
// ];
const fs = require("fs"); // node 處理讀寫
const path = require("path"); // node 處理路徑
const crypto = require("crypto"); //加密、產生唯一 ID

// JSON 檔案路徑
// __dirname: 當前路徑
const filePath = path.join(__dirname, "vocabulary.json");

// 讀取 JSON
const readVocabulary = () => {
  // fs.existsSync()     // 檢查檔案是否存在
  if (!fs.existsSync(filePath)) {
    writeVocabulary([]);
  }
  // fs.readFileSync()   // 讀取檔案
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

// 寫入 JSON
const writeVocabulary = (data) => {
  // fs.writeFileSync()  // 寫入檔案
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};
// 取得單字
router.get("/vocabulary", function (req, res) {
  const vocabulary = readVocabulary();
  console.log("GET vocabulary 被呼叫", vocabulary);
  res.json({ success: true, data: vocabulary });
});
// 新增單字
router.post("/vocabulary", function (req, res) {
  console.log("POST vocabulary 被呼叫");

  const { word, romaji, mean } = req.body;

  // 檢查必填欄位
  if (!word || !romaji || !mean) {
    return res.status(400).json({
      success: false,
      message: "word、romaji、mean 為必填",
    });
  }
  const vocabulary = readVocabulary();
  // 檢查單字是否重複
  const duplicate = vocabulary.find((v) => v.word === word);
  if (duplicate) {
    return res.status(400).json({
      success: false,
      message: "單字已存在",
    });
  }
  // crypto.randomUUID() 產生唯一 UUID
  const newWord = { id: crypto.randomUUID(), word, romaji, mean };
  vocabulary.push(newWord);
  writeVocabulary(vocabulary);
  // 新增後印出整個陣列確認
  console.log("目前陣列：", vocabulary);
  console.log("陣列長度：", vocabulary.length);

  res.status(201).json({ success: true, data: newWord });
});
// GET /api/products
router.get("/products", function (req, res) {
  console.log("GET /products 被呼叫"); // 🔹 加 log
  res.json({ success: true, data: products });
});

// POST /api/products
// router.post("/products", function (req, res) {
//   console.log("POST /products 被呼叫", req.body); // 🔹 加 log
//   const newProduct = req.body;
//   newProduct.id = products.length + 1;
//   products.push(newProduct);
//   res.status(201).json({ success: true, data: newProduct });
// });
//

module.exports = router;
