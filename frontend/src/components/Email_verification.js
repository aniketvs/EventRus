import React, { useEffect, useState } from "react";
import { useParams ,Link} from "react-router-dom";
import verification_image from '../images/checkmark.png'
const Email_verification = ()=>{
    let params = useParams();
    let [verify,setverify]=useState(false);
    useEffect(()=>{

        let verification = async()=>{
            try{
            await fetch(`http://localhost:5000/${params.id}/verify/${params.token}`)
            
       


            setverify(true)
            } catch(error){
                console.log(error);
                setverify(false);

            }
        }
        verification();
    },[params]);
    let  data=localStorage.getItem('signups');
        data=JSON.parse(data);
        let sign = {name:data.name,email:data.email,profile:data.profile,verified:true,_id:data._id};
        localStorage.setItem('signups',JSON.stringify(sign));
    return(<>
        {
            verify ?
            
            <div className="email_verification_div">
            <img src={verification_image} class="rounded mx-auto d-block" alt={verification_image}/>
            <h4 className="email_verification_text">Email Is Verified Successfully</h4>
            <h4 className="email_verification_text2">Please Procced To Login</h4>
          
             <Link to="/login" className="btn btn-green email-verfication-btn">Login</Link>
            </div>
         
           
            
            : 
            <div>
            <h1>404</h1>
            <h4>Page Not Found</h4>
            </div>
            
            
        }
    </>);
}
export default Email_verification;