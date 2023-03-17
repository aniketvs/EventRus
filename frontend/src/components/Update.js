import React, { useEffect, useState } from 'react'
import pic from "../images/refresh.png";
import banner from "../images/banner_2.png"
import {useNavigate, useParams} from 'react-router-dom';
import {URL} from '../Url'
export default function Update() {
    const [name,setname] =useState("");
    const [cateogry,setcateogry]=useState("");
    const [company,setcompany]=useState("");
    const [price,setprice]=useState("");
     const [errors,seterrors]=useState(false);
   const params = useParams();
   const navigate= useNavigate();
  useEffect(()=>{
    prefil();
  },[])

    const prefil = async()=>{
       
        let result = await fetch(`${URL}update/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setname(result.name);
        setcateogry(result.cateogry);
        setcompany(result.company);
        setprice(result.price);
       
        
      
    }
    const regex=/^(\d{1,3}(,\d{3})*|\d+)(\.\d+)?$/;
const testregx=/[(a-zA-Z)+(!@#$%^&*())+]/ ;
///[(a-zA-Z)+(\!\@\#\$\%\^\&\*\(\))+]/;
    const update =async()=>{


        if(!name && !price && !company && !cateogry && !pic){
            
             seterrors(true);
            return false;
          }
        
        
        if(!regex.test(price)){
        
          seterrors(true);
          return false;
        }
        if(!testregx.test(name) ||!testregx.test(company) || !testregx.test(cateogry)){
        
          seterrors(true);
          return false;
        }
        let formData = new FormData();
        formData.append('name',name);
        formData.append('company',company);
        formData.append('cateogry',cateogry);
        formData.append('price',price);
      
        let result =await fetch(`${URL}update/${params.id}`,{
            method:'put',
            body:formData,
            headers:{

               authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                
            },
        })
        result = await result.json();
    
         if(result.acknowledged){
            navigate('/admin');
         } else{
           alert('you not updated any data');
         }
    }



  
    return (
        <>
         <img src={banner} className="img-fluid img-ratio" alt={"./public/admin_images/banner_1.png"} />
         <div className="row  add-text my-3">
            <div className="col-12">
                   <h4 className="add-text-inside">UPDATE  YOUR <br/>EVENT <br/>HERE!</h4>
            </div>
        </div>
            <div className='container    signup-body'>
                <div className='row g-3 justify-content-center signup-body pb-5'>
                <h4 className="search-text-black">Enter Your Event Data</h4>
                    <div className='col-6'>
                        <form className="row g-3">
                            <div className="col-md-6">
                                <label for="inputEmail4" className="form-label">Event Name</label>
                                <input type="text" value={name} onChange={(e) => { setname(e.target.value) }} className="form-control" id="inputEmail4" />
                                {errors && !name && <span className='error'>*Event Name is required</span>}
                                 {errors && !testregx.test(name) && <span className='error'>*Enter A Correct Event Name</span>}
                            </div>
                            <div className="col-md-6">
                                <label for="inputPassword4" className="form-label">Event Type</label>
                                <input type="text" value={company} onChange={(e) => { setcompany(e.target.value) }} className="form-control" id="inputPassword4" />
                                {errors && !company && <span className='error'>*Event Type is required</span>}
                                 {errors && !testregx.test(company) && <span className='error'>*Enter A Correct Event Type</span>}
                            </div>
                            <div className="col-12">
                                <label for="inputAddress" className="form-label">Description</label>
                                <input type="text" value={cateogry} onChange={(e) => { setcateogry(e.target.value) }} className="form-control" id="inputAddress" placeholder="ex.- mobile,fridge,tv" />
                                {errors && !cateogry && <span className='error'>*Event Description is required</span>}
                                {errors && !testregx.test(cateogry) && <span className='error'>*Enter A Correct Description</span>}
                            </div>
                            <div className="col-12">
                                <label for="inputAddress2" className="form-label">Price</label>
                                <input type="tel" value={price} onChange={(e) => { setprice(e.target.value) }} className="form-control" id="inputAddress2" placeholder="ex.- 1234" />
                                {errors && !price && <span className='error'>*price is required</span>}
                                {errors && !regex.test(price) && <span className='error'>*Enter A Valid Price</span>}
                            </div>
                            
                            <div className="col-12 sign-up-btn mt-5">
                                <button type="button" onClick={update} className="btn btn-green">Update Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}