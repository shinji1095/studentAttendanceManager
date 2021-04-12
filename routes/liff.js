var express = require('express');
const LiffController = require('../controllers/LiffController');
var router = express.Router();
const liffController = require("../controllers/LiffController");
const UserController = require("../controllers/UserController");
const AttendanceController = require("../controllers/AttendanceController");

/* GET home page. */
router.get("/", (req, res) => {
    res.send("liff")
})

// 生徒の出席
router.get("/student/attend", liffController.attend);
router.post("/student/attend", AttendanceController.attend);
//　生徒の退席
router.get("/student/leave", LiffController.leave);
router.post("/student/leave", AttendanceController.leave);
// 生徒の登録
router.get("/student/register", LiffController.register);
router.post("/student/register", UserController.register);
// 生徒の出席状況の確認
router.get("/student/check", LiffController.check);
// データの変更
router.get("/attendance/alter/confirm", LiffController.alterConfirm);
router.get("/attendance/alter", LiffController.alter);

module.exports = router;
