const express = require('express');
const router = express.Router();

const Room = require('../models/room');

router.get('/getallrooms', async (req, res) => {
    try {
        const rooms = await Room.find({});
        //return res.status(200).json(rooms);
        res.send(rooms)
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.post('/getroombyid', async (req, res) => {

    const roomid = req.body.roomid;

    try {
        const room = await Room.findOne({_id : roomid});
        //return res.status(200).json(rooms);
        res.send(room)
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.post('/addroom', async (req, res) => {
    try{
        const newroom = new Room(req.body);
        await newroom.save();

        res.send('Room added successfully');
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
    
});


module.exports = router;