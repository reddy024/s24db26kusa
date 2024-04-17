const mongoose = require("mongoose")
const foodsSchema = mongoose.Schema({
foodName: String,
category: {
    type : String,
    minlength : 1,
    maxlength :20,
},
price: {
    type:Number,
    min : 1,
    max : 200,
}
})
module.exports = mongoose.model("foods",
foodsSchema)