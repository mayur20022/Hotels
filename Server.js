const express = require('express')
const app = express()
const db = require('./db')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const Person = require('./models/Person')
const MenuItems = require('./models/Menu')


app.get("/", (req, res) => {
    res.send("Welcom")
})










const PersonRoute = require('./routes/personRoute')
const MenuRoute = require('./routes/menuRoute')

app.use('/person', PersonRoute)
app.use('/menu', MenuRoute)


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

