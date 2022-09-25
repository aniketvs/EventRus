const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    profile:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('profile',schema);