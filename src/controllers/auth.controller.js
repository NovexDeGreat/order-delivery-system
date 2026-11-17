const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const authService = require('../service/auth.service')
const registerUser = async(req, res) => {
    try{

        const{fullname, email, password} = req.body;

        if(!fullname || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields'});
        }

        console.log(email)

        const existingUser = await User.findOne({email});
        if(existingUser) {
            res.status(400).json({ message: 'User already exists'});
        }

        await authService.registerUser({fullname, email, password});
        res.status(201).json({message: 'User registration is successfull'})

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullname,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            message: 'Registration successful',
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            }
        })

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error registering user'});
    }
}


const loginUser = async(req, res) => {
    try{
         const{email, password} = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const {token, user} = await authService.loginUser(email, password)

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            }
        })
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error logging in user' })
    }
}       

const verifyEmail = async(req, res) => {
    try{
        const{email, token} = req.body;
        
        if(!email || !token){
            return res.status(400).json({ error: 'Token and email are required'})
        }
        
        await authService.verifyEmail({email, token})
        console.log(email, token)

        res.status(200).json({message: 'Email verification was successful'})

    }catch(error){
        console.log(error)
        return res.status(500).json({error: error.message})

    }
}

module.exports = { registerUser, loginUser, verifyEmail }