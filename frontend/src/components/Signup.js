import React from "react";
import { useState, useEffect } from "react";
import { json, useNavigate } from 'react-router-dom';

export default function Signup() {
  let [name, setname] = useState('');
  let [email, setEmail] = useState('');
  let [password, setpassword] = useState('');
  let [img, setimg] = useState({ preview: '', data: '' });
  let [errors, seterrors] = useState(false);
  let [verification, setverification] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const authe = localStorage.getItem('signups');
    let email_verificatione = JSON.parse(authe);

    if (authe && email_verificatione.verified) {
      navigate('/')
    }

  })
  //validating with regex for email,password and name
  const emailregx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const passwordregx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const nameregx = /[a-zA-Z][a-zA-Z ]*/;

  let auth;
  let email_verification;
  let signup = async (e) => {
    e.preventDefault()
    //if name email and password is empty
    if (!name && !email && !password && img) {
      seterrors(true);
      return false;
    }
    //if email password and name is not matched with regex
    if (!emailregx.test(email)) {
      seterrors(true);
      return false;
    }
    if (!passwordregx.test(password)) {
      seterrors(true);
      return false;
    }
    if (!nameregx.test(name)) {
      seterrors(true);
      return false;
    }
    let formData = new FormData();
    formData.append('profile', img.data);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('verified', false);
    let result = await fetch('http://localhost:5000/signup', {
      method: 'post',
      body: formData,
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

      }

    })
    result = await result.json();
    localStorage.setItem('signups', JSON.stringify(result.result));
    localStorage.setItem('token', JSON.stringify(result.auth));

    auth = localStorage.getItem('signups');
    email_verification = JSON.parse(auth).verified;

    setverification(email_verification);

    if (auth && email_verification) {
      navigate('/')
    }



  }


  //profile picture 

  const handleFileChange = (e) => {
    const imge = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setimg(imge)
  }
  return (
    <>
      <img src={"./admin_images/login.png"} className="img-fluid img-ratio" alt={"./public/admin_images/login.png"} />

      <div className="container  ">
        <div className="row g-3 justify-content-center ">
          <div className="col-5 signup-body-part login-pos">
            <h3 className="login-head " >Register</h3>
            <form className="row g-3">
              <div className="col-12">
                <label for="inputAddress" className="form-label login-sub-text">Full Name</label>
                <input type="text" className="form-control login-input" id="inputAddress" value={name} onChange={(e) => { setname(e.target.value); }} placeholder="Enter Your Name" />
                {errors && !name && <span className='error'>*Full Nameis required</span>}
                {errors && !nameregx.test(name) && <span className='error'>*Enter A Correct Name</span>}
              </div>
              <div className="col-md-6">
                <label for="inputEmail4" className="form-label login-sub-text">Email</label>
                <input type="email" className="form-control login-input" id="inputEmail4" value={email} onChange={(e) => { setEmail(e.target.value); }} placeholder="Enter Your Email" />
                {errors && !email && <span className='error'>*email is required</span>}
                {errors && !emailregx.test(email) && <span className='error'>*Enter A Correct email</span>}
              </div>
              <div className="col-md-6">
                <label for="inputPassword4" className="form-label login-sub-text">Password</label>
                <input type="password" className="form-control login-input" id="inputPassword4" value={password} onChange={(e) => { setpassword(e.target.value); }} placeholder="Enter Your Password" />
                {errors && !password && <span className='error'>*password is required</span>}
                {errors && !passwordregx.test(password) && <span className='error'>*Enter A Correct Password (min length 8,uppercase,lowercase,special character)</span>}
              </div>
              <div className="col-md-6">
                <label for="inputPassword4" className="form-label login-sub-text">Profile Picture</label>
                <input type="file" className="form-control login-input" onChange={handleFileChange} placeholder="Enter Your Password" />
              </div>

              <div className="col-12 sign-up-btn mt-3" >
                <button onClick={signup} className="btn btn-transparent">Sign up</button>
                </div>
              
                <div className="col-12 sign-up-btn " >
                {(verification === true) ? "":

                  <div className='email-alert-div'>
                    <span className='email-alert' >Please Verify Your email</span>
                  </div> 
                }   
                </div>
            </form>
          </div>
        </div>
      </div>

    </>

  )
}
