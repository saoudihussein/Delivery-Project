const _ = require("lodash");
const router = require("express").Router();
const { Command, command_validation } = require("../models/command");

router.get("", async (req, res) => {
    res.send(await Command.find().populate("idFood.id")
                                 .populate("idClient.id")
                                 .populate("idLiv.id"));
})

router.get("/:id", async (req, res) => {
    let command = await Command.findById(req.params.id).populate("idFood.id")
                                                       .populate("idClient.id")
                                                       .populate("idLiv.id");
    if (!command) {
        res.status(404).send("Command not Found !!!")
    }
    res.send(command);
})

router.post("", async (req, res) => {
    let validation = command_validation(req.body);
    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }
    let command = new Command({
        date:new Date(),
        idFood: req.body.idFood,
        idClient: req.body.idClient,
        idLiv: req.body.idLiv
    })
    command = await command.save();
    res.status(201).send(command);
})

router.put("/:id", async (req, res) => {
    let command = await Command.findById(req.params.id);
    if (!command) {
        res.status(404).send("Not Found !!!")
    }
    command = _.merge(command, req.body);
    command = await command.save();
    res.status(201).send(command);
})


router.delete("/:id", async (req, res) => {
    let command = await Command.findByIdAndDelete(req.params.id)
    if (!command) {
        res.status(404).send("Command not found !!")
    }
    res.send(command);
})

module.exports = router;