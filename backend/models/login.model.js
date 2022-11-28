const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true, 
        max: 32
    },
    email: {
        type: String, 
        trim: true, 
        required: true, 
        unique: true, 
        lowercase: true
    }, 
    img: {
        data: Buffer,
        contentType: String
    }
}, {timestamps: true})

const Login_user = mongoose.model('User', userSchema)
module.exports = Login_user;