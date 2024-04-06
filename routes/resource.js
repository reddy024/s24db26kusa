var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var foods_controller = require('../controllers/foods');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// foods ROUTES ///
// POST request for creating a foods.
router.post('/foods', foods_controller.foods_create_post);
// DELETE request to delete foods.
router.delete('/foods/:id', foods_controller.foods_delete);
// PUT request to update foods.
router.put('/foods/:id', foods_controller.foods_update_put);
// GET request for one foods.
router.get('/foods/:id', foods_controller.foods_detail);
// GET request for list of all foods items.
router.get('/foods', foods_controller.foods_list);
module.exports = router;
// API for our resources
