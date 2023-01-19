import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MailVerification() {
    let params=useParams();
    let [verify,setverify]=useState(false);
    useEffect(()=>{
      let verification=async()=>{
        try{
          await fetch(`http://localhost:5000/${params.id}/UserVerification/${params.token}`);
          setverify(true)
          } catch(error){
              console.log(error);
              setverify(false);

          }
      }
      verification();

        },[params]);


    
  return (
   <>
    <h1>successfully email verify</h1>
   </>
  )
}
