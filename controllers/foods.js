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
// Handle Costume delete on DELETE.
exports.foods_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await foods.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
    };
// Handle a show one view with id specified by query
exports.foods_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await foods.findById( req.query.id)
    res.render('fooddetail',
    { title: 'food Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };
// Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.foods_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('foodcreate', { title: 'food Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };

// Handle building the view for updating a costume.
// query provides the id
exports.foods_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await foods.findById(req.query.id)
    res.render('foodupdate', { title: 'food Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };
// Handle a delete one view with id from query
exports.foods_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await foods.findById(req.query.id)
    res.render('fooddelete', { title: 'food Delete', toShow:
    result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };