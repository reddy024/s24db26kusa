const express = require('express');
const food_controllers= require('../controllers/foods');
var router = express.Router();

/* GET costumes */
router.get('/', food_controllers.foods_view_all_Page);

// GET request for one food.
router.get('/foods/:id', food_controllers.foods_detail);

// PUT request for updating a specific car
router.put('/foods/:id', food_controllers.foods_update_put);

module.exports = router;
