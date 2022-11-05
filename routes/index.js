var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('main.html', { root: path.join(__dirname) });
});

module.exports = router;
