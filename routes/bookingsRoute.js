const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Room = require('../models/room');
const moment = require('moment');

router.post('/bookroom', async (req, res) => {
    const { room, userid, fromdate, todate, totalamount, totaldays } = req.body;

    try {
        const newBooking = new Booking({
            room: room.nome,
            roomid: room._id,
            userid,
            fromdate,
            todate,
            totalamount,
            totaldays,
            transactionid: 'abcd',
        });

        const booking = await newBooking.save(); 

        const roomtemp = await Room.findOne({ _id: room._id });
        roomtemp.prenotazioni_attuali.push({
            bookingid: booking._id,
            fromdate: fromdate,
            todate: todate,
            userid: userid,
            status: booking.status,
        });

        await roomtemp.save();

        res.send('Room booked successfully');
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;