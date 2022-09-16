
const express = require('express');
const cors = require('cors');

const app= express();
app.use(express.json());
app.use(cors());
//signup configration
require('./signup_db/config')
const model = require('./signup_db/signup_schema')
//addproduct configration
require('./add_products_db/config');

const add_products = require('./add_products_db/schema');




//signup api
app.post('/signup', async (req,res)=>{
    let data = new model(req.body);
    let result=await data.save();
    result = result.toObject();
    delete result.password;
res.send(result);
});
app.post('/login', async (req,res)=>{
    if(req.body.email && req.body.password){
    let data = await model.findOne(req.body).select('-password');
     if(data){
        res.send(data);
     }else{
        res.send({result:"NO RESULT IS FOUND"});
     }
    }else{
        res.send({result:"No result is found"});
    }
 
});


//add products api
app.post('/add',async (req,res)=>{
    const data = new  add_products(req.body);
    const result = await data.save();
    res.send(result);
})
app.listen(5000);