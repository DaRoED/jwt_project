import mongoose from "mongoose";

require('dotenv').config();

export async function connect() {
    async function connect() {
        mongoose.connect(process.env.MongoDB_url, (err) => {
            if (err) throw new Error(err);
            console.log('MongoDB connected');
        });
    }

    await connect();

    mongoose.connection.on('disconnected', connect);
}