const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.DB_URL;

if (!mongoURL) {
    console.error("❌ ERROR: DB_URL is not defined in .env file");
    process.exit(1); // Stop execution if DB_URL is missing
}

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

const db = mongoose.connection;

db.on('disconnected', () => {
    console.log("⚠️ Disconnected from MongoDB");
});

module.exports = db;
