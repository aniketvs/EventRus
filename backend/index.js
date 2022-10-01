
const express = require('express');
const cors = require('cors');

const app= express();

app.use(cors());
//signup configration
require('./signup_db/config')
const model = require('./signup_db/signup_schema')
//addproduct configration
require('./add_products_db/config');

const nodemailer = require('nodemailer');
//add product model
const add_products = require('./add_products_db/schema');



//profile multer
require('./profile_db/config');
const profilepic = require('./profile_db/schema');
//jwt token
app.use(express.json());
const jwt = require('jsonwebtoken');
const jwtkey='Aniket@2111';



//signup api



//multer profile image upload
//multer
const fileFilter = (req,file,cb)=>{
    if(file.mimetype=='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
    }
    const multer=require('multer');
    const uploads=multer({
        storage:multer.diskStorage({
            destination:function(req,file,cb){
                cb(null,'../frontend/public/images');
            },
            filename:function(req,file,cb){
                cb(null,Date.now()+"-"+file.originalname);
            }
        }) ,
        limits:{
            fileSize:1024*1024*10
        },
        fileFilter:fileFilter
        
    }).single('profile');
    
    // app.post('/uploads',uploads,async (req,resp)=>{
    //     const data = new  profilepic({profile:req.file.path});
    //     const result = await data.save();
    //     resp.json({});
       
    // });
    




app.post('/signup', uploads ,async (req,res)=>{
    let data = new model({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        profile:req.file.path
    });
    let result=await data.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({result},jwtkey,{expiresIn:"30h"},(err,token)=>{
        if(err){
            res.send({result:"something went wrong"});
        }
        
        res.send({result,auth:token});
    })

});
app.post('/login', async (req,res)=>{
    if(req.body.email && req.body.password){
    let data = await model.findOne(req.body).select('-password');
    jwt.sign({data},jwtkey,{expiresIn:'30h'},(err,token)=>{
           
       if(err){
        res.send({result:"please try again to login"});
       }
        if(data){
            res.send({data , auth:token});
         }else{
            res.send({result:"NO RESULT IS FOUND"});
         }
        
    })
    
 
}});
//add product multer
const productpic=multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,'../frontend/public/images/productpic');
        },
        filename:function(req,file,cb){
            cb(null,Date.now()+"-"+file.originalname);
        }
    }) ,
    limits:{
        fileSize:1024*1024*10
    },
    fileFilter:fileFilter
    
}).single('productpic');

//add products api
app.post('/add',productpic,verifytoken,async (req,resp)=>{
    const data = new  add_products({
        name:req.body.name,
    price:req.body.price,
    cateogry:req.body.cateogry,
    company:req.body.company,
    userid:req.body.userid,
    productpic:req.file.path,
    });
    const result = await data.save();
    resp.send(result);
})

//product listing api
app.get('/',verifytoken,async (req,resp)=>{
    const result = await add_products.find();
    if(result.length>0){
    resp.send(result);}
    else {
        resp.send({result:"there is no product"});
    }
})
//product delete api
app.delete('/delete/:id',verifytoken,async (req,resp)=>{
    const result =await add_products.deleteOne({_id:req.params.id});
    resp.send(result);
})
//product update api
app.put('/update/:id',productpic,verifytoken, async (req,resp)=>{
    const data =await add_products.updateOne({_id:req.params.id}, {
     
         $set:req.body
      
    });
    resp.send(data);
})

// product update api get
app.get('/update/:id',verifytoken,async (req,resp)=>{
    const data=await add_products.findOne({_id:req.params.id});
    if(data){
        resp.send(data);
    }else{
        resp.send({result:"no record is found"});
    }
})
// product api search
app.get('/search/:key',verifytoken,async (req,resp)=>{
    const data=await add_products.find({
        '$or':[
            {name:{$regex:req.params.key}},
            {cateogry:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
          

        ]
    });
    resp.send(data);
   
})



//token verification
function verifytoken(req,resp,next){
   let token = req.headers['authorization'];
    if(token){
        token=token.split(' ')[1];
    jwt.verify(token,jwtkey,(err,valid)=>{
      if(err){
        resp.send({result:"you have wrong token"});
      }else{
        next();
      }

        
    })}
    else{
        resp.send({result:"soory you not provided any token"});
    }

}


//email serviece
// let transporter = nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//         user:'sharmavinod8454@gmail.com',
//         pass:"Aniketsharma2111"
//     }
// })
// let mailoption={
//     from:'sharmavinod8454@gmail.com',
//     to:'aniketsharma65656@gmail.com',

// }
app.listen(5000);