
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

//dotenv for nodemailer
require('dotenv').config();

//signup api



//multer profile image upload
//multer

    const uploads=require('./modules/profile_multer');
    
const token_signup=require('./signup_db/token');

const crypto=require('crypto');



app.post('/signup', uploads ,async (req,res)=>{
    let data = new model({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        profile:req.file.path,
        verified:false,
    });
    let result=await data.save();
    let Token =await new token_signup({
        userid:result._id,
        token:crypto.randomBytes(32).toString("hex")
    }).save();

    let transporte = nodemailer.createTransport({
        service:'gmail',
        secure:true,
        auth:{
            type: "OAuth2",
            user:process.env.EMAIL,
            pass:process.env.WORD,
            clientId:process.env.OAUTH_CLIENTID,
            clientSecret:process.env.OAUTH_CLIENT_SECRET,
            refreshToken:process.env.OAUTH_REFRESH_TOKEN,
        },
    });
    const url=`http://localhost:3000/signup/${result._id}/verify/${Token.token}`;
    
    let mailoption={
        from:'sharmavinod8454@.com',
        to:result.email,
        subject:"verify mail",
        text:url,
    
    };
    transporte.sendMail(mailoption,(err,data)=>{
        if(err){
            console.log(err);
        }else {
            console.log("Email sent successfully"+data.response);
           
        }
    });
    
    
    result = result.toObject();
    delete result.password;
    jwt.sign({result},jwtkey,{expiresIn:"30h"},(err,token)=>{
        if(err){
            res.send({result:"something went wrong"});
        }
        
        res.send({result,auth:token});
    })
    

});
app.get('/:id/verify/:token',async (req,res)=>{
    const user = await model.findOne({_id:req.params.id});
    if(!user)return res.send({result:"user link invalid"});
    const Token_ = await token_signup.findOne({userid:req.params.id,token:req.params.token});
    if(!Token_)return res.send({result:"token link invalid"});
   let result= await model.updateOne({_id:user._id},{verified:true});
   res.json(result);
    await token.remove();
})



app.post('/login', async (req,res)=>{
    if(req.body.email && req.body.password){
    let data = await model.findOne(req.body).select('-password');
    
    if(!data.verified){
        let Token=await token_signup.findOne({userid:data._id});
        if(!Token){
            Token =await new token_signup({
                userid:data._id,
                token:crypto.randomBytes(32).toString("hex")
            }).save();
        }
        const url=`http://localhost:3000/signup/${data._id}/verify/${Token.token}`;
    
            let transporte = nodemailer.createTransport({
                service:'gmail',
                secure:true,
                auth:{
                    type: "OAuth2",
                    user:process.env.EMAIL,
                    pass:process.env.WORD,
                    clientId:process.env.OAUTH_CLIENTID,
                    clientSecret:process.env.OAUTH_CLIENT_SECRET,
                    refreshToken:process.env.OAUTH_REFRESH_TOKEN,
                },
            })

            let mailoption={
                from:'sharmavinod8454@.com',
                to:data.email,
                subject:"verify mail",
                text:url,
            
            };
            transporte.sendMail(mailoption,(err,data)=>{
                if(err){
                    console.log(err);
                }else {
                    console.log("Email sent successfully"+data.response);
                   
                }
            });
         
        
    }




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
const productpic=require('./modules/productpic_multer');
const token = require('./signup_db/token');
const { modelName } = require('./signup_db/signup_schema');

//add products api
app.post('/add',productpic,verifytoken,async (req,resp)=>{
 
    
    const data = new  add_products({
        name:req.body.name,
    price:req.body.price,
    cateogry:req.body.cateogry,
    company:req.body.company,
    userid:req.body.userid,
    productpic:req.files,
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
let transporter = nodemailer.createTransport({
    service:'gmail',
    secure:true,
    auth:{

        type: "OAuth2",
        user:process.env.EMAIL,
        pass:process.env.WORD,
        clientId:process.env.OAUTH_CLIENTID,
        clientSecret:process.env.OAUTH_CLIENT_SECRET,
        refreshToken:process.env.OAUTH_REFRESH_TOKEN,
        
    },
})
transporter.verify((err,sucess)=>{
    err? app.post('/send-mail',(req,resp)=>{ 
        console.log(err);    
    }):
    app.post('/send-mail',(req,resp)=>{
        let mailoption={
            from:'eventrus89@gmail.com',
            to:process.env.EMAIL,
            subject:req.body.text,
            text:req.body.subject,
        
        };
        transporter.sendMail(mailoption,(err,data)=>{
            if(err){
                console.log(err);
            }else {
                console.log("Email sent successfully"+data.response);
                resp.send({data});
            }
        })
    });
});



app.listen(5000);