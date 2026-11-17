const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    address: {
        type: String,
        require: false,
        default: ''
    },
    phone: {
        type: String,
        require: false,
        trim: true,
        unique: true
    },

    email: {
        type: String,
        require: true,
        trim: true
    },
    role: {
        type: String,
        enum:['user', 'admin'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)

module.exports = User