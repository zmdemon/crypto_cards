const {Router} = require("express");
const Link = require("../models/Link");
const Address = require("../models/Address");
const auth = require("../middleware/auth.middleware");
const config = require("config");
const shortid = require("shortid");
require("dotenv").config()
const router = Router()

router.post("/add", auth, async (req, res) => {
    try {
        const {nickname, address, currency} = req.body
        const existingAddress = await Link.findOne({address})
        if (existingAddress) {
            return res.json({address: existingAddress})
        }
        const newAddress = new Address({
            nickname, address, currency, owner: req.user.userId
        })

        await newAddress.save()

        res.status(201).json({newAddress})


    } catch (e) {
        res.status(500).json({message: 'Не то'})
        console.log(e)
    }
})

router.get("/", auth, async (req, res) => {
    try {
        const addresses = await Address.find({owner: req.user.userId})
        res.json(addresses)
    } catch (e) {
        res.status(500).json({message: 'User\'s addresses not found'})
    }
})

router.get("/:id",auth, async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({message: 'Не то'})
    }
})

module.exports = router
