import express from 'express';
const router = express.Router();

import Room from '../models/room.js';
import { verifyAdmin } from '../utils/verifyToken.js';

// Ottiene tutte le stanze, tutti possono farlo
router.get('/getallrooms', async (req, res, next) => {
    try {
        const rooms = await Room.find({});
        //return res.status(200).json(rooms);
        res.send(rooms)
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// Ottiene una stanza, tutti possono farlo
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

// Aggiunge una stanza, solo se l'utente è admin
router.post('/addroom', verifyAdmin, async (req, res) => {
    try{
        const newroom = new Room(req.body);
        await newroom.save();

        res.send('Room added successfully');
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
    
});

// Cancella una stanza, solo se l'utente è admin
router.delete('/deleteroom/:id', verifyAdmin, async (req, res) => {
    try{
        const roomid = req.params.id;
        await Room.deleteOne({_id : roomid});

        res.send('Room deleted successfully');
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// Aggiorna una stanza, solo se l'utente è admin
router.put('/updateroom/:id', verifyAdmin, async (req, res) => {
    try{
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.send(updatedRoom);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});


export default router;