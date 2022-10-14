const nodemailer = require('nodemailer');

module.exports =async (email,text,subject)=>{
let transporter = nodemailer.createTransport({
    service:'gmail',
    secure:true,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.WORD,
    }
  
})

let mailoption = {
    from:process.env.EMAIL,
    to:email,
    subject:subject,
    text:text
}
await transporter.sendMail(mailoption,(err,data)=>{
    if(err){
        console.log(err);
    }else {
        console.log("Email sent successfully"+data.response);
        
    }
});


}