const mongoose = require("mongoose");
require("dotenv").config();

let connectionPromise;

const initializeDatabase = async () => {
    const mongoUri = process.env.MONGODB;

    if (!mongoUri) {
        throw new Error("MONGODB environment variable is missing.");
    }

    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(mongoUri).catch((error) => {
            connectionPromise = null;
            throw error;
        });
    }

    return connectionPromise;
};

module.exports = { initializeDatabase };