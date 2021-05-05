const _ = require("lodash");
const router = require("express").Router();
const { Category, category_validation } = require("../models/category");

router.get("", async (req, res) => {
    res.send(await Category.find())
})

router.get("/:id", async (req, res) => {
    let category = await Category.findById(req.params.id);
    if (!category) {
        res.status(404).send("Category not Found !!!")
    }
    res.send(category);
})

router.post("", async (req, res) => {
    let validation = category_validation(req.body);
    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }
    let category = new Category({
        name: req.body.name

    })
    category = await category.save();
    res.status(201).send(category);
})

router.put("/:id", async (req, res) => {
    let category = await Category.findById(req.params.id);
    if (!category) {
        res.status(404).send("Not Found !!!")
    }
    category = _.merge(category, req.body);
    category = await category.save();
    res.status(201).send(category);
})


router.delete("/:id", async (req, res) => {
    let category = await Category.findByIdAndDelete(req.params.id)
    if (!category) {
        res.status(404).send("Category not found !!")
    }
    res.send(category);
})

module.exports = router;