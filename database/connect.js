const mongoose = require('mongoose');

require('dotenv').config();

module.exports = async function connect() {
    async function connect() {
        mongoose.connect(process.env.MongoDB_url, (err) => {
            if (err) console.log(`MongoDB Error: ${err}`);
            console.log('MongoDB connected');
        });
    }

    await connect();

    mongoose.connection.on('disconnected', connect);
}