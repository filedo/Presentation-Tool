var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/loaded', function(req, res) {
  res.render('loaded');
});

module.exports = router;