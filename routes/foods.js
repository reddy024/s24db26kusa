var express = require('express');
var router = express.Router();


const foods = [
  {name:'biryani',category:'meals',price:'500'},
  {name:'icecream',category:'refreshing items',price:'400'},
  {name:'halwa',category:'sweets',price:'1000'},
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('foods', { title: 'Serch results', foods });
});

module.exports = router;


