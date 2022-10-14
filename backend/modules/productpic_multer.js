const multer=require('multer');
const fileFilter = (req,file,cb)=>{
    if(file.mimetype=='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
    }
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
        
    }).array('productpic',4);

    module.exports=productpic;