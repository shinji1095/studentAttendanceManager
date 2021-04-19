var express = require('express');
var router = express.Router();
const webhookController = require("../controllers/webhookController");
const Attendance = require("../models").Attendance;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/webhook/", webhookController.handleEvent);
router.get("/speech/", (req, res, next) => {
  res.render("onsei")
})

router.get("/delete/:id", (req, res, next) => {
  let id = req.params.id;
  Attendance.destroy({
    where:{
      id
    }
  })
})

module.exports = router;
