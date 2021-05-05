const _ = require("lodash");
const router = require("express").Router();
const { Food, food_validation } = require("../models/food");

router.get("", async (req, res) => {
    res.send(await Food.find().populate("idCat.id"))
})

router.get("/:id", async (req, res) => {
    let food = await Food.findById(req.params.id).populate("idCat.id");
    if (!food) {
        res.status(404).send("Food not Found !!!")
    }
    res.send(food);
})

router.post("", async (req, res) => {
    let validation = food_validation(req.body);
    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }
    let food = new Food({
        name: req.body.name,
        price: req.body.price,
        idCat: req.body.idCat

    })
    food = await food.save();
    res.status(201).send(food);
})

router.put("/:id", async (req, res) => {
    let food = await Food.findById(req.params.id);
    if (!food) {
        res.status(404).send("Not Found !!!")
    }
    food = _.merge(food, req.body);
    food = await food.save();
    res.status(201).send(food);
})


router.delete("/:id", async (req, res) => {
    let food = await Food.findByIdAndDelete(req.params.id)
    if (!food) {
        res.status(404).send("Food not found !!")
    }
    res.send(food);
})

module.exports = router;