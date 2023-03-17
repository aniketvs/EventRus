import React, { useState } from "react";
import { Link} from "react-router-dom";
import brand_logo from "../images/events-r-us.svg" 
import instagram_logo from "../images/instagram.png" 
import facebook_logo from "../images/facebook.png" 
import twitter_logo from "../images/twitter.png" 
import Mapg from "../User_Component/Mapg";
import {URL} from '../Url'
const Footer=(p)=>{
  let [text,settext]=useState("");
  let [subject,setsubject]=useState("");
let [error,seterror]=useState(false);
const phone =/^([+]\d{2})?\d{10}$/;

  let sendmail=async ()=>{
    try{
    if(!text  && !subject){
      seterror(true);
      return false;
    }
  if(!phone.test(text)){
    seterror(true);
    return false;
  }

   let result= await fetch(`${URL}send-mail`,{
      method:'post',
      body:JSON.stringify({text,subject}),
      headers:{
         'Content-Type':'application/json'
      }
   });
  
  result=await result.json();

alert("message sent succefully",result);
  }catch(err){
    console.log(err);
  }


  }
 
 
    return(
        <>
         <Mapg/>
      <div className="card footer-set" >
  
  <div className="card-body footer-pad">
   <div className="row">
      <div className="col-12 footer-img">
      <img src={brand_logo} alt={brand_logo} width="150" height="120" />
   
      </div>
      <div className="col-4">
      <p className="social-media-text"> Social Media</p>
      <ul className="footer-list-social">
            
            <li className="social-icon"> <Link href="/admin">  <img src={instagram_logo} alt={instagram_logo}  /></Link> </li>
            <li className="social-icon"> <Link href="/admin">  <img src={facebook_logo} alt={facebook_logo}  /></Link> </li>
           <li className="social-icon"> <Link href="/admin">  <img src={twitter_logo} alt={twitter_logo}  /></Link> </li>
           
         </ul>
         
      </div>
      <div className="col-4">
         <ul className="footer-list">
         <li> <Link to="/admin" className="foter-link">Quick Links</Link> </li>
            <li> <Link to="/admin" className="foter-link">Home</Link> </li>
            <li> <Link to="/admin" className="foter-link">Help</Link> </li>
            <li> <Link to="/admin" className="foter-link">Add Product</Link> </li>
            <li> <Link to="/admin"  className="foter-link" onClick={()=>{p.alert(true)}} >Admin Panel</Link> </li>
        
            <li> <Link to="/admin" className="foter-link" data-bs-toggle="modal" data-bs-target="#exampleModal">Contact Us</Link> </li>
         </ul>
      </div>
      <div className="col-4">
    
         <p className="footer-add">G-34/A , First Floor</p>
           <p className="footer-add">Indra Bhavan , Civil Line</p>
           <p className="footer-add">Praygraj - 210001</p>
           <p className="footer-add">Mob - 8454833153</p>
           <p className="footer-add">Email - eventrus@gmail.com</p>
      </div>
      <hr className="footer-line"/>
      <div className="col-12">
            <p className="copyright-text">All rights reserved by ©eventRus 2022</p>
      </div>
   </div>
    
  </div>
</div>







<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Write Your Query</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <input type="tel" required value={text} maxLength={14} minLength={10} onChange={(e)=>{settext(e.target.value);}}  className="email-text" placeholder="Please Write Mobile No." />
      
        {error && !subject  && <span className='error'>*this field is required</span> } 
        {error && !phone.test(text) && <span className='error'>*please enter valid data </span>}
      <hr/>
       <input type="text" required value={subject} onChange={(e)=>{setsubject(e.target.value);}}  className="email-text" placeholder="Enter Your Message" />
       {error && !text && <span className='error'>*please enter your Query</span>}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-green"  onClick={sendmail}>Send</button>
      </div>
    </div>
  </div>
</div>
        </>
    );
}
export default Footer;