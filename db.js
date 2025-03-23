const mongoose = require('mongoose')

// console.log(mongoose)

const mongoURL = 'mongodb://localhost:27017/hotels'

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
