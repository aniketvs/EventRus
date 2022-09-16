const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:String,
    price:Number,
    cateogry:String,
    userid:String,
    company:String,

});

module.exports = mongoose.model('add_products',schema);