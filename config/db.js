const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/joas', 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, 

(err) => {
    if(!err) {console.log('mongodb connected Succeeded.')}
    else {console.log('Error in Db connection: '+ err)}
});

require('../models/User');