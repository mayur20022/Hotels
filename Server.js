const express = require('express')
const app = express()
const db = require('./db')

require('dotenv').config();
const PORT = process.env.PORT || 3000

const bodyParser = require('body-parser')
app.use(bodyParser.json())


app.get("/", (req, res) => {
    res.send("Welcom")
})

const PersonRoute = require('./routes/personRoute')
const MenuRoute = require('./routes/menuRoute')

app.use('/person', PersonRoute)
app.use('/menu', MenuRoute)


app.listen(PORT, () => {
    console.log('Server is running on port 3000')
})

