const _ = require("lodash");
const router = require("express").Router();
const { User, user_validation } = require("../models/user");

router.get("", async (req, res) => {
    res.send(await User.find())
})

router.get("/:id", async (req, res) => {
    let user = await User.findById(req.params.id);
    if (!user) {
        res.status(404).send("User not Found !!!")
    }
    res.send(user);
})

router.post("", async (req, res) => {
    let validation = user_validation(req.body);
    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }
    let user = new User({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: req.body.password

    })
    user = await user.save();
    res.status(201).send(user);
})

router.put("/:id", async (req, res) => {
    let user = await User.findById(req.params.id);
    if (!user) {
        res.status(404).send("Not Found !!!")
    }
    user = _.merge(user, req.body);
    user = await user.save();
    res.status(201).send(user);
})


router.delete("/:id", async (req, res) => {
    let user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
        res.status(404).send("User not found !!")
    }
    res.send(user);
})

module.exports = router;