const joi = require("joi");
const joiObjectid = require("joi-objectid");
joi.ObjectId = require("joi-objectid")(joi);
const mongoose = require("mongoose");

const commandSchema = new mongoose.Schema({
    date: Date,
    idFood:{id: { type: mongoose.Schema.Types.ObjectId, ref: "Food" }},
    idClient:{id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }},
    idLiv:{id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }}
})

let command_validation_schema = joi.object({
    idFood: {id:joi.ObjectId().required()},
    idClient: {id:joi.ObjectId().required()},
    idLiv: {id:joi.ObjectId().required()}
})

function command_validation(body) {
    return command_validation_schema.validate(body);
}

const command = mongoose.model('Command', commandSchema);

module.exports.Command = command;
module.exports.command_validation = command_validation;