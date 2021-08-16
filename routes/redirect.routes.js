const {Router} = require("express")
const Card = require("../models/Card")
const router = Router()
require("dotenv").config()



router.get('/:code',  async (req, res) => {
    try {
        await Card.findOne({code: req.params.code},async function (err, card) {
            if (err) {
                res.send({
                    success: false,
                    message: 'connection error'
                })
                return;
            }
            if (card) {
                // card.clicks++
                // await card.save()

                const {cardTitle, description, selectedArray} = await card.toObject()
                const cryptos = await Promise.all(selectedArray.map(it => {
                    const {currency, address} = it
                    return {currency, address}
                }))
                const cake = {
                    cardTitle, description, cryptos
                }
                res.json(cake)
            }

        })


        // res.status(404).json("Ссылку не нашел")
    } catch (e) {
        res.status(500).json({message: 'Не редирект, а чмо'})
    }
})

module.exports = router
