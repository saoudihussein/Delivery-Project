const joi = require("joi");
const joiObjectid = require("joi-objectid");
joi.ObjectId = require("joi-objectid")(joi);
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: String
})

let category_validation_schema = joi.object({
    name: joi.string().required(),
})

function category_validation(body) {
    return category_validation_schema.validate(body);
}

const category = mongoose.model('Category', categorySchema);

module.exports.Category = category;
module.exports.category_validation = category_validation;