import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

var mongoURL = process.env.MONGO_DB_URL;

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

var connection = mongoose.connection;

connection.on('error' , (err) => {
    console.log("MongoDB Connection ERROR: " + err.message);
})

connection.on('connected', () => {
    console.log("MongoDB Connected");
})

export default connection;