import express from 'express';
const Router = express.Router(); 
import User from '../models/user.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { verifyAdmin, verifyToken } from '../utils/verifyToken.js';
import dotenv from 'dotenv';


/*Router.post("/register2", async(req, res) => {
  
    const newUser = new User({nome : req.body.nome, email : req.body.email, password : req.body.password});
    //const newUser = new User(req.body);

    try {
        const user = await newUser.save();
        res.send('User registered successfully'); 
    } catch (error) {
        return res.status(400).json({error});
    }

});

Router.post("/login2", async(req, res) => {
  
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
});*/

Router.get("/getallusers", verifyAdmin, async(req, res, next) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        return res.status(400).json({error});
    }
});

//Register a new user with a hashed password and create a token
Router.post("/register", async(req, res) => {
    try {
        const {nome, email, password} = req.body
    
        //simple validation
        if(!nome || !email || !password){
            return res.status(400).json({message: 'Please enter all fields'}); 
        }
    
        //check for existing user
        if(await User.findOne({email : email})){
            return res.status(400).json({message: 'User already exists'}); 
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({nome : nome, email : email, password : hash, isAdmin: false});
        await newUser.save();

        res.send('User registered successfully');

    } catch (error) {
        console.log("Generic error: ", error)
        return res.status(400).json({error});
    }




});

//Login a registered user
Router.post("/login", async(req, res) => {
    try {

        //simple validation
        if(!req.body.email || !req.body.password){
            return res.status(400).json({message: 'Please enter all fields'});
        }
        //check for existing user
        const user = await User.findOne({email : req.body.email})
        if(!user){
            return res.status(400).json({message: 'User does not exist'});
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: 3600});

        const {password, isAdmin, ...rest} = user._doc;

        res.cookie('token', token, {httpOnly: true}).status(200).json({isAdmin, ...rest});

    } catch (error) {
        return res.status(400).json({error});
    }
});

//check authentication
Router.get("/checkauthentication", verifyToken, (req, res, next)=>{
    res.send(req.user);
})

export default Router;