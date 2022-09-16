
const Mongoose = require('mongoose');

const schema= new Mongoose.Schema({
    name:String,
    email:String,
    password:String
});

module.exports = Mongoose.model('signups',schema);