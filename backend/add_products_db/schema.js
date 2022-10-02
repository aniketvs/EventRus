const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    cateogry:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    productpic:{
        type:Array,
        required:true
    }

});

module.exports = mongoose.model('add_products',schema);