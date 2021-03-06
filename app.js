// console.log("А я все думал, когда же ты появишься!")
const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require("path");

require("dotenv").config()
const app = express()

const PORT = process.env.PORT || 5000
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(express.json({extended: true}))
app.use("/api/auth", require('./routes/auth.routes'))
app.use("/api/link", require('./routes/link.routes'))
app.use("/api/card", require('./routes/card.routes'))
app.use("/api/address", require('./routes/address.routes'))
app.use("/c", require('./routes/redirect.routes'))

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }).then(() => console.log("MongoDB has been connected"))
            .catch((err) => console.log(err));

        app.listen(PORT, () => {
            console.log(`App although has rised on port: ${PORT}`)
        })
    } catch (e) {
        process.exit(1)
    }
}

start()


