const joi = require("joi");
const joiObjectid = require("joi-objectid");
joi.ObjectId = require("joi-objectid")(joi);
const mongoose = require("mongoose");

const restaurentSchema = new mongoose.Schema({
    name: String,
    phoneNumber: Number,
    email:String,
    password:String

})

let restaurent_validation_schema = joi.object({
    name: joi.string().required(),
    phoneNumber: joi.number().required(),
    adress: joi.string().required(),
    email: joi.string().email({ tlds: { allow: false } }).required(),
    password: joi.string().min(6).required(),
})

function restaurent_validation(body) {
    return restaurent_validation_schema.validate(body);
}

const restaurent = mongoose.model('Restaurent', restaurentSchema);

module.exports.Restaurent = restaurent;
module.exports.restaurent_validation = restaurent_validation;