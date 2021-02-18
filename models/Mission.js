const mongoose = require('mongoose')

const MissionSchema = new mongoose.Schema({
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
module.exports = mongoose.model('Mission', MissionSchema);