const _ = require("lodash");
const router = require("express").Router();
const { Restaurent, restaurent_validation } = require("../models/restaurent");

router.get("", async (req, res) => {
    res.send(await Restaurent.find())
})

router.get("/:id", async (req, res) => {
    let restaurent = await Restaurent.findById(req.params.id);
    if (!restaurent) {
        res.status(404).send("Restaurent not Found !!!")
    }
    res.send(restaurent);
})

router.post("", async (req, res) => {
    let validation = restaurent_validation(req.body);
    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }
    let restaurent = new Restaurent({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        adress: req.body.adress,
        email: req.body.email,
        password: req.body.password

    })
    restaurent = await restaurent.save();
    res.status(201).send(restaurent);
})

router.put("/:id", async (req, res) => {
    let restaurent = await Restaurent.findById(req.params.id);
    if (!restaurent) {
        res.status(404).send("Not Found !!!")
    }
    restaurent = _.merge(restaurent, req.body);
    restaurent = await restaurent.save();
    res.status(201).send(restaurent);
})


router.delete("/:id", async (req, res) => {
    let restaurent = await Restaurent.findByIdAndDelete(req.params.id)
    if (!restaurent) {
        res.status(404).send("Restaurent not found !!")
    }
    res.send(restaurent);
})

module.exports = router;