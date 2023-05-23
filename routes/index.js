var express = require('express');
var router = express.Router();
var questionController = require('../controllers/questionController.js');

router.get('/', questionController.list);

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

module.exports = router;
