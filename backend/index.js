
const express = require('express');
const cors = require('cors');

const app = express();

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
const jwtkey = 'Aniket@2111';

//dotenv for env process
require('dotenv').config();

//profile photo multer
const uploads = require('./modules/profile_multer');
//token for email verification
const token_signup = require('./signup_db/token');
//to genrate encoded token
const crypto = require('crypto');

// to has password
const bycrypt = require('bcrypt');
//signup api
app.post('/signup', uploads, async (req, res) => {

    let hashpsassword = await bycrypt.hash(req.body.password, 10);
    let data = new model({
        name: req.body.name,
        email: req.body.email,
        password: hashpsassword,
        profile: req.file.path,
        verified: false,
    });
  
    let result = await data.save();
    let Token = await new token_signup({
        userid: result._id,
        token: crypto.randomBytes(32).toString("hex")
    }).save();

    let transporte = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            pass: process.env.WORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        },
    });
    const url = `http://localhost:3000/signup/${result._id}/verify/${Token.token}`;

    let mailoption = {
        from: 'sharmavinod8454@.com',
        to: result.email,
        subject: "verify mail",
        text: url,

    };
    transporte.sendMail(mailoption, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Email sent successfully" + data.response);

        }
    });


    result = result.toObject();
    delete result.password;
    jwt.sign({ result }, jwtkey, { expiresIn: "30h" }, (err, token) => {
        if (err) {
            res.send({ result: "something went wrong" });
        }

        res.send({ result, auth: token });
    })


});
app.get('/:id/verify/:token', async (req, res) => {
    const user = await model.findOne({ _id: req.params.id });
    if (!user) return res.send({ result: "user link invalid" });
    const Token_ = await token_signup.findOne({ userid: req.params.id, token: req.params.token });
    if (!Token_) return res.send({ result: "token link invalid" });
    let result = await model.updateOne({ _id: user._id }, { verified: true });
    res.json(result);
    await token.remove();
})



app.post('/login', async (req, res) => {
    if (req.body.email && req.body.password) {

        let data = await model.findOne({email:req.body.email});
        const match = await bycrypt.compare(req.body.password, data.password);
        data = data.toObject();
    delete data.password;
        if (match) {
            
            if (!data.verified) {
                let Token = await token_signup.findOne({ userid: data._id });
                if (!Token) {
                    Token = await new token_signup({
                        userid: data._id,
                        token: crypto.randomBytes(32).toString("hex")
                    }).save();
                }
                console.log(data.password);
                const url = `http://localhost:3000/signup/${data._id}/verify/${Token.token}`;

                let transporte = nodemailer.createTransport({
                    service: 'gmail',
                    secure: true,
                    auth: {
                        type: "OAuth2",
                        user: process.env.EMAIL,
                        pass: process.env.WORD,
                        clientId: process.env.OAUTH_CLIENTID,
                        clientSecret: process.env.OAUTH_CLIENT_SECRET,
                        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
                    },
                })

                let mailoption = {
                    from: 'sharmavinod8454@.com',
                    to: data.email,
                    subject: "verify mail",
                    text: url,

                };
                transporte.sendMail(mailoption, (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Email sent successfully" + data.response);

                    }
                });


            }




            jwt.sign({ data }, jwtkey, { expiresIn: '30h' }, (err, token) => {

                if (err) {
                    res.send({ result: "please try again to login" });
                }
                if (data) {
                    res.send({ data, auth: token });
                } else {
                    res.send({ result: "NO RESULT IS FOUND" });
                }

            })
        }

    }
});

//add product multer
const productpic = require('./modules/productpic_multer');
const token = require('./signup_db/token');
const { modelName } = require('./signup_db/signup_schema');

//add products api
app.post('/add', productpic, verifytoken, async (req, resp) => {


    const data = new add_products({
        name: req.body.name,
        price: req.body.price,
        cateogry: req.body.cateogry,
        company: req.body.company,
        userid: req.body.userid,
        productpic: req.files,
    });

    const result = await data.save();

    resp.send(result);

})

//product listing api
app.get('/', verifytoken, async (req, resp) => {
    const result = await add_products.find();
    if (result.length > 0) {
        resp.send(result);
    }
    else {
        resp.send({ result: "there is no product" });
    }
})
//product delete api
app.delete('/delete/:id', verifytoken, async (req, resp) => {
    const result = await add_products.deleteOne({ _id: req.params.id });
    resp.send(result);
})
//product update api
app.put('/update/:id', productpic, verifytoken, async (req, resp) => {
    const data = await add_products.updateOne({ _id: req.params.id }, {

        $set: req.body

    });
    resp.send(data);
})

// product update api get
app.get('/update/:id', verifytoken, async (req, resp) => {
    const data = await add_products.findOne({ _id: req.params.id });
    if (data) {
        resp.send(data);
    } else {
        resp.send({ result: "no record is found" });
    }
})
// product api search
app.get('/search/:key', verifytoken, async (req, resp) => {
    const data = await add_products.find({
        '$or': [
            { name: { $regex: req.params.key } },
            { cateogry: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },


        ]
    });
    resp.send(data);

})



//token verification
function verifytoken(req, resp, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, jwtkey, (err, valid) => {
            if (err) {
                resp.send({ result: "you have wrong token" });
            } else {
                next();
            }


        })
    }
    else {
        resp.send({ result: "soory you not provided any token" });
    }

}


//email serviece
let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {

        type: "OAuth2",
        user: process.env.EMAIL,
        pass: process.env.WORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,

    },
})
transporter.verify((err, sucess) => {
    err ? app.post('/send-mail', (req, resp) => {
        console.log(err);
    }) :
        app.post('/send-mail', (req, resp) => {
            let mailoption = {
                from: 'eventrus89@gmail.com',
                to: process.env.EMAIL,
                subject: req.body.text,
                text: req.body.subject,

            };
            transporter.sendMail(mailoption, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Email sent successfully" + data.response);
                    resp.send({ data });
                }
            })
        });
});

//user pannel
//services getting api
app.get('/services',async(req,resp)=>{
let result =await add_products.find();
if(result.length>0){
resp.send(result);}
else{
    resp.send({result:"sorry there is no service is present"});
}
})


//User Pannel


const Contact_Us=require('./ContactUs_Form/Contactus_Schema');

app.post('/contact',async(req,resp)=>{
const data=new Contact_Us({
name:req.body.name,
email:req.body.email,
phone:req.body.phone,
message:req.body.message
});
let result=await data.save();
if(result){
resp.send(result);}
else{
    resp.send({result:false});
}
});


//user registration 
const Registeration= require('./Register/register');
app.post('/register',async(req,resp)=>{
    const hashedpass=await bycrypt.hash(req.body.password,10);
const data=new Registeration({
    name:req.body.name,
    phone:req.body.phone,
    email:req.body.email,
    password:hashedpass,
    verified:false
});
let result=await data.save();

let Token=await new token_signup({
    userid:result._id,
    token:crypto.randomBytes(32).toString('hex')
}).save();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth:{
        type: "OAuth2",
        user: process.env.EMAIL,
        pass: process.env.WORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
});
const url=`http://localhost:3000/register/${result._id}/UserVerification/${Token.token}`;

let mailoption={
    from: 'sharmavinod8454@.com',
    to: result.email,
    subject: "verify email",
    text: url,
};
transporter.sendMail(mailoption,(err,data)=>{
    if (err) {
        console.log(err);
    } else {
        console.log("Email sent successfully" + data.response);

    }
});


if(result){
    resp.send(result);
}else{
    resp.send({message:"error"});
}
});
app.post('/resendEmail', async (req,res)=>{
    console.log(req.body);
    const Token_ = await token_signup.findOne({ userid: req.body.getid});
    if(Token_){
      let response = await token_signup.deleteOne({userid:req.body.getid});
      console.log(response);
    }
    let Token=await new token_signup({
        userid:req.body.getid,
        token:crypto.randomBytes(32).toString('hex')
    }).save();
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth:{
            type: "OAuth2",
            user: process.env.EMAIL,
            pass: process.env.WORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        },
    });
    const url=`http://localhost:3000/register/${req.body.getid}/UserVerification/${Token.token}`;
    
    let mailoption={
        from: 'sharmavinod8454@.com',
        to: req.body.getemail,
        subject: "verify email",
        text: url,
    };
    transporter.sendMail(mailoption,(err,data)=>{
        if (err) {
            console.log(err);
        } else {
            console.log("Email sent successfully" + data.response);
              res.send({result:"success"});
        }
    });
})
app.get('/:id/UserVerification/:token', async (req, res) => {
    const user = await Registeration.findOne({ _id: req.params.id });
    if (!user) return res.send({ result: "user link invalid" });
    const Token_ = await token_signup.findOne({ userid: req.params.id, token: req.params.token });
    if (!Token_) return res.send({ result: "token link invalid" });
    let result = await Registeration.updateOne({ _id: user._id }, { verified: true });
    res.json(result);
    await token.remove();
})



app.listen(5000);