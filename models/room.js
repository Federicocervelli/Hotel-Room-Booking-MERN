const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    capienza: {
        type: Number,
        required: true
    },
    costo: {
        type: Number,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    descrizione: {
        type: String,
        required: true,
    },
    urlimmagini: [],
    prenotazioni_attuali: [],
    flags: [],
    recensioni: [],
}, { timestamps: true });

const roomModel = mongoose.model('room', roomSchema);
module.exports = roomModel;