require("dotenv").config()

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next()
    }

    try {


        next()

    } catch (e) {
        return res.status(401).json({message: "Нет авторизации"})
    }
}
