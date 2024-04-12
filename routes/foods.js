const express = require('express');
const food_controllers= require('../controllers/foods');
var router = express.Router();

/* GET costumes */
router.get('/', food_controllers.foods_view_all_Page);

// GET request for one food.
router.get('/foods/:id', food_controllers.foods_detail);

// PUT request for updating a specific car
router.put('/foods/:id', food_controllers.foods_update_put);
/* GET detail costume page */
router.get('/detail', food_controllers.foods_view_one_Page);
router.get('/create', food_controllers.foods_create_Page);
router.get('/update', food_controllers.foods_update_Page);
router.get('/delete', food_controllers.foods_delete_Page);
module.exports = router;
