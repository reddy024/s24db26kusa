const foods = require('../models/foods');
var Food = require('../models/foods');

exports.foods_list = function (req, res) {
    res.send('NOT IMPLEMENTED: foods list');
};

exports.foods_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: foods detail: ' + req.params.id);
};

exports.foods_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: foods create POST');
};

exports.foods_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: foods delete DELETE ' + req.params.id);
};

exports.foods_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: foods update PUT' + req.params.id);
};

//List of all Foods
exports.foods_list = async function(req, res) {
    try {
        theFoods = await foods.find();
        res.send(theFoods);
    } catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// VIEWS
// Handle a show all view
exports.foods_view_all_Page = async function(req, res) {
    try {
        theFoods = await foods.find();
        res.render('foods', { title: 'Food Search Results', results: theFoods });
    } catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle Food create on POST.
exports.foods_create_post = async function(req, res) {
    console.log(req.body);
    let document = new Food();
    document.foodName = req.body.foodName;
    document.category = req.body.category;
    document.price = req.body.price;
    try {
        let result = await document.save();
        res.send(result);
    } catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// GET request for one food.
exports.foods_detail = async function(req, res) {
    console.log("detail" + req.params.id);
    try {
        result = await Food.findById(req.params.id);
        if (result) {
            res.send(result);
        } else {
            res.status(404).send({ error: `Document for id ${req.params.id} not found` });
        }
    } catch (error) {
        res.status(500).send({ error: `Error retrieving document: ${error.message}` });
    }
};

// Handle Food update on PUT.
exports.foods_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
    try {
        let toUpdate = await Food.findById(req.params.id);
        if(req.body.food_type) toUpdate.food_type = req.body.food_type;
        if(req.body.foodName) toUpdate.foodName = req.body.foodName;
        if(req.body.category) toUpdate.category = req.body.category;
        if(req.body.price) toUpdate.price = req.body.price;
        let result = await toUpdate.save();
        console.log("Success " + result);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};
