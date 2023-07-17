import mongoose from 'mongoose';

const userSchema = mongoose.Schema({

    nome: {
        type: String,
        require: true
    },
    email: {
        type: String, 
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
})

export default mongoose.model('users', userSchema);