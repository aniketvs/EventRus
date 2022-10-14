
const Mongoose = require('mongoose');

const schema= new Mongoose.Schema({
    name:String,
    email:String,
    password:String,
    profile:{
        type:String,
        requires:true
    },
    verified:{
        type:Boolean,
        default:false
    }
});

module.exports = Mongoose.model('signups',schema);