const joi = require("joi");
const joiObjectid = require("joi-objectid");
joi.ObjectId = require("joi-objectid")(joi);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    phoneNumber: Number,
    email:String,
    password:String

})

let user_validation_schema = joi.object({
    name: joi.string().required(),
    phoneNumber: joi.number().required(),
    email: joi.string().email({ tlds: { allow: false } }).required(),
    password: joi.string().min(6).required(),
})

function user_validation(body) {
    return user_validation_schema.validate(body);
}

const user = mongoose.model('User', userSchema);

module.exports.User = user;
module.exports.user_validation = user_validation;