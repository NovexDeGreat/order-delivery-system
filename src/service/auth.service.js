
const jwt = require('jsonwebtoken');
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const Token = require('../models/token.model')
const mailService = require('./mail.service')

const registerUser = async({fullname, email, password}) => {
    const existingUser = await User.findOne({email})
    if(existingUser){
        throw new Error('All fields are required')
    }

    const firstName = fullname.split(' ')[0]

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
        fullname,
        email,
        password: hashedPassword
    })

    await newUser.save();

    const code = ("" + Math.floor(1000 + Math.random() * 9000))
    await Token.create({
        userId: newUser._id,
        code
    })

    await mailService.sendVerificationEmail(email, firstName, code)



    return newUser
}

const loginUser = async(email, password)=>{
    const user = await User.findOne({email})

    if(!user){
        throw new Error("User not found")
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password)

    if(!passwordMatch){
        throw new Error("Invalid password")
    }

   // if(user.isVerified !== true) throw new Error('Please verify your email')

    const token = jwt.sign({id: user._id, email: user.email, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'})
    return ({
        token: token,
        user: user
    })
}

const verifyEmail = async({email, token}) => {
    const user = await User.findOne({email})

    if(!user) throw new Error('User not found')

    const tokenDoc = await Token.findOne({userId: user._id, code: token})

    console.log(`db token: ${tokenDoc}, userId: ${user._id}, code: ${token}`)

    if(!tokenDoc) throw new Error('Invalid or expired vweerification token')

        user.isVerified = true;
        await Token.deleteOne({_id: tokenDoc._id})
}


module.exports = {registerUser, loginUser, verifyEmail}