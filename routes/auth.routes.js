const {Router} = require("express");
const User = require("../models/CardUser");
const {check, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const config = require('config')
const router = Router()
require("dotenv").config()


module.exports = router

router.post('/register', [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Invalid password').isLength({min: 6})
], async (req, res) => {
    try {
        console.log(req.body)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Некорректные данные при регистрации"
            })

        }

        const {email, password} = req.body

        const candidate = await User.findOne({email})

        if (candidate) {
            return res.status(400).json({message: "Уже есть такой юзер"})
        }
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({email, password: hashedPassword})
        await user.save()
        res.status(201).json({message: "User created"})

    } catch (e) {
        res.status(500).json({message: 'Не то'})
    }
})

router.post(
    '/login',
    [
        check('email', 'некорректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()

    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при попытке входа"
                })
            }
            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({
                    message: "Пользователь не найден"
                })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({
                    message: "Пароль не верный"
                })
            }

            const token = jwt.sign(
                {userId: user.id},
                process.env.JWT_SECRET,
                {expiresIn: '1h'}
            )
            res.json({token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: 'Не то'})
        }
    })
