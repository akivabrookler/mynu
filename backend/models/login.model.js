const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: false, 
        max: 32
    },
    email: {
        type: String, 
        trim: true, 
        required: false, 
        unique: true, 
        lowercase: true
    }
})

const Login_user = mongoose.model('User', userSchema)
module.exports = Login_user;