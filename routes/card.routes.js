const {Router} = require("express");
const Card = require("../models/Card");
const auth = require("../middleware/auth.middleware");
const shortid = require("shortid");
require("dotenv").config()
const router = Router()

router.post("/add", auth, async (req, res) => {
    try {
        const baseUrl = process.env.BASE_URL
        const code = shortid.generate()


        const {cardTitle, selectedArray, addresses, description} = req.body

        const cardLink = '/c/' + code

        const newCard = new Card({
            cardTitle, selectedArray, description, addresses, cardLink, code, owner: req.user.userId
        })

        await newCard.save()

        res.status(201).json({newCard})


    } catch (e) {
        res.status(500).json({message: 'Card route goes crazy'})
        console.log(e)
    }
})

router.get("/", auth, async (req, res) => {
    try {
        const userCards = await Card.find({owner: req.user.userId})
        res.json(userCards)
    } catch (e) {
        res.status(500).json({message: 'Cards were not found'})
    }
})

router.get("/:id", auth, async (req, res) => {
    try {
        const card = await Card.findById(req.params.id)
        res.json(card)
    } catch (e) {
        res.status(500).json({message: 'Card was not found by id'})
    }
})

module.exports = router
