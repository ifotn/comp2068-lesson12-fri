var express = require('express');
var router = express.Router();

// link to the Drink model
var Drink = require('../models/drink');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// GET /drinks
router.get('/drinks', function(req, res, next) {
  Drink.find(function(err, drinks) {
    if (err) {
      return next(err);
    }

    // no error, so send back json data
    res.json(drinks);

  });
});

// POST /drinks
router.post('/drinks', function(req, res, next) {
  // pass the entire request body (the new drink json)
  var newDrink = new Drink(req.body);

  newDrink.save(function(err, drink) {
    if (err) {
      return next(err);
    }

    res.json(drink);
  });
});

// DELETE /drinks/_id
router.delete('/drinks/:_id', function(req, res, next) {
  var _id = req.params._id;

  Drink.remove({ _id: _id }, function(err, drink) {
    if (err) {
      return next(err);
    }

    res.json(drink);
  });
});

// GET /drinks/_id
router.get('/drinks/:_id', function(req, res, next) {
  var _id = req.params._id;

  Drink.findById({ _id: _id }, function(err, drink) {
    if (err) {
      return next(err);
    }

    res.json(drink);
  });
});

// PUT /drinks/_id
router.put('/drinks/:_id', function(req, res, next) {
  var _id = req.params._id;

  Drink.update({ _id: _id }, req.body, function(err, drink) {
    if (err) {
      return next(err);
    }

    res.json(drink);
  });
});

module.exports = router;
