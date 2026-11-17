const user = require('../models/user.model')

const getProfile = async(req, res) => {
    try{
        console.log('protected route was passed')
    }catch(error){
        console.error(error)
    }
}

const getAllUsers = async(req, res) =>{
    try{
        const users = await Users.find().select("-password").sort({createdAt: -1})

        return res.status(200).json({
            message: 'User fetched successfully',
            count : users.length,
            users,

        })
    }catch(error){
        return res.status(500).json({
            message: 'Something went wrong',
        })
    }
}



module.exports = {getProfile, getAllUsers}