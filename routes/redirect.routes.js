const {Router} = require("express");
const Card = require("../models/Card");
const Address = require("../models/Address");
const router = Router()
require("dotenv").config()


router.get('/:code', async (req, res) => {
    try {
        const card = await Card.findOne({code: req.params.code})

        if (card) {
            card.clicks++
            await card.save()
            const extCard = {
                ...card, selectedArray: card.selectedArray.map(async item => {
                    return Address.findOne({_id: item});
                })
            }


            // return res.redirect(process.env.BASE_URL + card.cardLink)
            res.json(extCard)
            // console.log(card.selectedArray)
        }
        res.status(404).json("Ссылку не нашел")
    } catch (e) {
        res.status(500).json({message: 'Не редирект, а чмо'})
    }
})

module.exports = router
