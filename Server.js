const express = require('express')
const app = express()
require('dotenv').config();
const db = require('./db')

const passport = require("./auth")


const localAuthMiddleware = passport.authenticate("local", { session: false })

app.use(passport.initialize());


const PORT = process.env.PORT || 3000

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request to : ${req.url}`)
    next()
}
app.use(logRequest)


app.get("/", (req, res) => {
    res.send("Welcom")
})



const PersonRoute = require('./routes/personRoute')
const MenuRoute = require('./routes/menuRoute')

app.use('/person', PersonRoute)
app.use('/menu', MenuRoute)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

