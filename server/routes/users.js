// routes/users.js
var express = require("express");
var router = express.Router();

// 假使用者資料
const users = [
  { id: 1, name: "小明" },
  { id: 2, name: "小華" },
];

/* GET users listing. */
router.get("/", function (req, res) {
  // res.send("respond with a resource");
  res.json({ success: true, users });
});

// GET /users/:id → 查單一使用者
router.get("/:id", function (req, res) {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });
  res.json({ success: true, user });
});
module.exports = router;
