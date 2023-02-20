const mongoose = require('mongoose');
const schema=mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
phone:{
    type:Number,
    required:true
},
eventName:{
    type:String,
    required:true
},
eventType:{
    type:String,
    required:true
},
startDate:{
    type:String,
    required:true
},
endDate:{
    type:String,
    required:true
},
message:{
    type:String
}


});


module.exports=mongoose.model('Clients',schema);