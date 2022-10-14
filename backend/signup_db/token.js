const mongoose = require('mongoose');
const schema= new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"signup_schema",
        required:true,
        unique:true
    },
    token:{type:String,required:true},
    createdAt:{type:Date,default:Date.now(),expiers:3600}
})
module.exports = mongoose.model("token",schema);