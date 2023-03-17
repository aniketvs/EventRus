import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {URL} from '../../Url'
export default function MailVerification() {
    let params=useParams();
    let [verify,setverify]=useState(false);
    useEffect(()=>{
      let verification=async()=>{
        try{
          await fetch(`${URL}${params.id}/UserVerification/${params.token}`);
          setverify(true)
          } catch(error){
              console.log(error);
              setverify(false);

          }
      }
      verification();

        },[params]);


        let  data=localStorage.getItem('register_user');
        data=JSON.parse(data);
        localStorage.removeItem('register_user');
        let sign = {name:data.name,phone:data.phone,email:data.email,verified:verify,_id:data._id};
        localStorage.setItem('register_user',JSON.stringify(sign));
  return (
   <>
    <h1>successfully email verify</h1>
   </>
  )
}
