const joi = require("joi");
const joiObjectid = require("joi-objectid");
joi.ObjectId = require("joi-objectid")(joi);
const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    name: String,
    price: Number,
    idCat:{id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }},
    

})

let food_validation_schema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    idCat: {id:joi.ObjectId().required()}
})

function food_validation(body) {
    return food_validation_schema.validate(body);
}

const food = mongoose.model('Food', foodSchema);

module.exports.Food = food;
module.exports.food_validation = food_validation;