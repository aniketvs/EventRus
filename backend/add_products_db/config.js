// code for local mongodb compase to connect to MongoDB
/*const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/e-com');
*/

// code for atlas to connect

const Mongoose=require('mongoose');
require('dotenv').config();
const DB=process.env.MONGO_URL;
Mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log("database connected")).catch((error)=>{
    console.log(error);
});