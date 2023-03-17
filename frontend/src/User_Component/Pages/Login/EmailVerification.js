import React from 'react'
import Email_Verfication from '../../images/Email.png'
import { Box } from '@mui/system'
import {Button} from '@mui/material'
import '../../Style/Login.css'
import { Typography } from '@mui/material'
import {URL} from '../../../Url'
export default function EmailVerification() {
    const ResendEmail = async()=>{
        let data=localStorage.getItem('register_user');
        data=JSON.parse(data);
       let getid=data._id;
      let getemail=data.email;
      try{
        let result = await fetch(`${URL}resendEmail`, {
            method: 'POST',
            body: JSON.stringify({getid,getemail}),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          result = await result.json();
         
          if(result){
            alert('Email Sent Successfully');
          }
        } catch(error){
            console.warn(error);
            alert('Something Went wrong');
        }
    }
    
  return (
    <>
         <Box className='trd-div'>
          <Typography>Please Verify Your Email !!</Typography>

           <img src={Email_Verfication} alt={Email_Verfication} className='Login-vector-email' />
           <Button variant='contend' className='lgn-btn' onClick={ResendEmail}  fullWidth>Resend Email</Button>

        </Box>
    </>
  )
}
