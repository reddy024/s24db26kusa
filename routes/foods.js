var express = require('express');
var router = express.Router();

const foods = [
  { name: 'biryani', category: 'meals', price: '500' },
  { name: 'icecream', category: 'refreshing items', price: '400' },
  { name: 'halwa', category: 'sweets', price: '1000' },
];

router.get('/', (req, res) => {
  res.render('foods', { title: 'Search results for food', foods });
});

module.exports = router;
