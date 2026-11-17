const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

const auth = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({
                mesaage: "Authentication header is required"
            })
        }
        if (!authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message: 'Invalid Authorization format'
            })
        }

        const token = authHeader.split(' ')[1]

        console.log(token)

        if(!token){
            return res.status(401).json({
                message: "Authentication token is missing or invalid"
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        const user = await User.findById(
            decoded.id
        ).select('password')
         if(!user){
            return res.status(401).json({
                message: 'User no longer exists'
            })
         }

         req.user = user;

         req.user.role = user.role || 'user'

        next()
    }catch(error){
        console.log(error.message)
    }
}

module.exports = auth