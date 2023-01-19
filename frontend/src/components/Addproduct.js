import React ,{useState}from 'react';
import { useNavigate } from 'react-router-dom';


const Addproduct = () => {
  const [name,setname] =useState("");
  const [cateogry,setcateogry] =useState("");
  const [company,setcompany] =useState("");
  const [price,setprice] =useState(0);
  const [pic,setpic] =useState(null);
  const [errors,seterrors] =useState(false);
  let auth=localStorage.getItem('signups');
  let userid=JSON.parse(auth)._id;
  const navigate = useNavigate();
//price and text regex
const regex=/\^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/;
const testregx=/[(a-zA-Z)+(\!\@\#\$\%\^\&\*\(\))+]/;
 const add= async()=>{
  // if name,prie,company and cateogry is empty
  if(!name && !price && !company && !cateogry && !pic){
 
     seterrors(true);
    return false;
  }
 // if prie is not validate

if(!regex.test(price)){

  seterrors(true);
  return false;
}
 // if name,company and cateogry is not validate
if(!testregx.test(name) ||!testregx.test(company) || !testregx.test(cateogry)){

  seterrors(true);
  return false;
}

let formData = new  FormData();
formData.append('name',name);
formData.append('price',price);
formData.append('company',company);
formData.append('cateogry',cateogry);
for(let i=0;i<pic.length;i++){
formData.append('productpic',pic[i]);
}
formData.append('userid',userid);


 let result = await fetch('http://localhost:5000/add',{
    method:'post',
    body:formData,
    headers:{
     authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
  result = await result.json()
  if(result){
     
    
      navigate('/admin');
      
  }else{
      alert('please provide correct details');
  }

 }





 //product picture
//  const handleFileChange = (e) => {
//   const imge = {
//     preview: URL.createObjectURL(e.target.files),
//     data: e.target.files,
//   }
  
//   setpic(imge);
  
// }
  return (
    <>
     <img src={"./admin_images/banner_2.png"} className="img-fluid img-ratio" alt={"./public/admin_images/banner_1.png"} />
     <div className="row  add-text my-3">
            <div className="col-12">
                   <h4 className="add-text-inside">ADD  YOUR <br/>EVENT <br/>HERE!</h4>
               

            </div>
        </div>

     <div className='container   pb-5 signup-body' >
      <div className='row g-3 justify-content-center signup-body'>
      <h4 className="search-text-black">Enter Your Event Data</h4>
      <div className='col-6'>
      <form className="row g-3">
        <div className="col-md-6">
          <label for="inputEmail4" className="form-label">Event Name</label>
          <input type="text" value={name} onChange={(e)=>{setname(e.target.value)}} required pattern="[a-zA-Z0-9]+" className="form-control" id="inputEmail4" />
          {errors && !name && <span className='error'>*Event Name is required</span>}
          {errors && !testregx.test(name) && <span className='error'>*Enter A Correct Event Name</span>}
        </div>
        <div className="col-md-6">
          <label for="inputPassword4" className="form-label">Event Type</label>
          <input type="text" value={company} onChange={(e)=>{setcompany(e.target.value)}} required pattern="[a-zA-Z]+" className="form-control" id="inputPassword4" />
          {errors && !company && <span className='error'>*Event Type is required</span>}
          {errors && !testregx.test(company) && <span className='error'>*Enter A Correct Event Type</span>}
   
        </div>
        <div className="col-12">
          <label for="inputAddress" className="form-label">Description</label>
          <input type="text" value={cateogry} onChange={(e)=>{setcateogry(e.target.value)}} required pattern="[a-zA-Z0-9]+"  className="form-control" id="inputAddress" placeholder="ex.- mobile,fridge,tv" />
          {errors && !cateogry && <span className='error'>*Event Description is required</span>}
          {errors && !testregx.test(cateogry) && <span className='error'>*Enter A Correct Description</span>}
   
        </div>
        <div className="col-12">
          <label for="inputAddress2" className="form-label">Cost Of Event</label>
          <input type="tel"value={price} onChange={(e)=>{setprice(e.target.value)}} required pattern="[0-9]+" className="form-control" id="inputAddress2" placeholder="ex.- 1234" />
          {errors && !price && <span className='error'>*price is required</span>}
          {errors && !regex.test(price) && <span className='error'>*Enter A Valid Price</span>}
        </div>
        <div className="col-md-6">
            <label for="inputPassword4" className="form-label">Product Picture</label>
         <input type="file" onChange={(e)=>{setpic(e.target.files)}} className="form-control" required  multiple />
         {errors && !name && <span className='error'>*please select at least one pic</span>}
          </div>
        <div className="col-12 sign-up-btn mt-5">
          <button type="button" onClick={add} className="btn btn-green">Add Product</button>
          
        </div>
      </form>
      </div>
      </div>
      </div>
    </>
  );
}
export default Addproduct;