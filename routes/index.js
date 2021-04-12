var express = require('express');
var router = express.Router();
const webhookController = require("../controllers/webhookController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/webhook/", webhookController.handleEvent);
router.get("/test", (req, res) => {
  res.render("attendDone")
})

module.exports = router;
