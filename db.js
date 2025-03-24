const mongoose = require('mongoose')

// console.log(mongoose)
require('dotenv').config()
// const DB_URL = process.env.DB_URL 
const DB_URL = process.env.LOC_URL


const mongoURL = DB_URL

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB')
})
db.on('error', (err) => {
    console.log('Error while Connect to MongoDB', err)
})
db.on('disconnected', () => {
    console.log('Disconnected from MongoDB')
})


module.exports = db;
