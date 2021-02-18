const mongoose = require('mongoose')

const GallarySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
     description: {
        type: String,
        required: true
    },
    imagename: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    }
   
})
module.exports = mongoose.model('Gallary', GallarySchema);