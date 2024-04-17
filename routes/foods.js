const express = require('express');
const food_controllers= require('../controllers/foods');
var router = express.Router();
var passport = require('passport')

/* GET costumes */
router.get('/', food_controllers.foods_view_all_Page);

// GET request for one food.
router.get('/foods/:id', food_controllers.foods_detail);

// PUT request for updating a specific car
router.put('/foods/:id', food_controllers.foods_update_put);
// A little function to check if we have an authorized user and continue on
//or
// redirect to login.
const secured = (req, res, next) => {
if (req.user){
return next();
}
res.redirect("/login");
}
/* GET detail costume page */
router.get('/detail', food_controllers.foods_view_one_Page);
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
    });
    
module.exports = router;
