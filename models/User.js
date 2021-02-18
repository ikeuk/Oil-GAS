const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'This field is required.'
    },
    email: {
        type: String,
        required: true,
        required: 'This field is required.'
    },
    password: {
        type: String,
        required: true,
        required: 'This field is required.'
    },
    createAt: {
        type: Date,
        default: Date.now
    }
   
})
  
module.exports = mongoose.model('User', UserSchema);