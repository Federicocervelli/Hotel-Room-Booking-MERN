import express from 'express';



import dbconfig from './db.js';
import roomsRoute from './routes/roomsRoute.js';
import usersRoute from './routes/usersRoute.js';
import bookingsRoute from './routes/bookingsRoute.js';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));