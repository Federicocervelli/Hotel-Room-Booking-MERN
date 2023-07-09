const express = require('express');
const Router = express.Router(); 
const User = require('../models/user')


Router.post("/register", async(req, res) => {
  
    const newUser = new User({nome : req.body.nome, email : req.body.email, password : req.body.password});
    //const newUser = new User(req.body);

    try {
        const user = await newUser.save();
        res.send('User registered successfully'); 
    } catch (error) {
        return res.status(400).json({error});
    }

});

Router.post("/login", async(req, res) => {
  
    const {email, password} = req.body

    try {
        const user = await User.findOne({email : email, password : password})
        if(user){
            const temp = {
                nome: user.nome,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id
            }
            res.send(temp)
        }else{
            return res.status(400).json({message: 'login failed'}); 
        }
    } catch (error) {
        return res.status(400).json({error}); 
    }
});

module.exports = Router;