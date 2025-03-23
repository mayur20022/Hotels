const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true, // Ensure TLS is enabled
    tlsInsecure: true, // Allow insecure TLS if needed
    serverSelectionTimeoutMS: 5000, // Set timeout for connection
})
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('❌ MongoDB Connection Error:', err);
});

db.on('disconnected', () => {
    console.warn('⚠️ Disconnected from MongoDB');
});

module.exports = db;
