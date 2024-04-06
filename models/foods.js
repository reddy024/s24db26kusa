const mongoose = require("mongoose")
const foodsSchema = mongoose.Schema({
foodName: String,
category: String,
price: Number
})
module.exports = mongoose.model("foods",
foodsSchema)