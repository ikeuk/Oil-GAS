const mongoose = require('mongoose')

const PreviouseSchema = new mongoose.Schema({
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
module.exports = mongoose.model('Previouse', PreviouseSchema);