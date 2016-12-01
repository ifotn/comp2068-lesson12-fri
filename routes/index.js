var express = require('express');
var router = express.Router();

// link to the Drink model
var Drink = require('../models/drink');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
