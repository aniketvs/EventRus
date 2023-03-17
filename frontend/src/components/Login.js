import React, { useEffect, useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import {URL} from '../Url'
const Login = () => {

    useEffect(() => {
        let authe = localStorage.getItem('signups');

        if (authe) {
            let verfication_email = JSON.parse(authe).verified;
            if (verfication_email === true) {
                navigate('/admin')
            }
        }
    })
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [errors, seterrors] = useState(false);
    const [verification, setverification] = useState(true);
    let auth;
    //validating email using regex
    const emailregx =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const navigate = useNavigate();

    const login = async () => {
        //validating email and password in emty case
        try{
        if (!email && !password) {
            seterrors(true);
            return false;
        }
        //validating email using regex
        if (!emailregx.test(email)) {
            seterrors(true);
            return false;
        }
        let result = await fetch(`${URL}login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': "application/json"
            },
        });
        result = await result.json()
        if (result.auth) {
            localStorage.setItem('signups', JSON.stringify(result.data));
            localStorage.setItem('token', JSON.stringify(result.auth));


            auth = localStorage.getItem('signups');

            if (auth) {
                let verfication_email = JSON.parse(auth).verified;
                setverification(verfication_email);
                if (verfication_email === true) {
                    navigate('/admin')
                }
            }
            // navigate('/');

        } else {
            alert('please provide email and password correct');
        }
    }catch (error) {
        console.log(error);
    }
    }


    return (
        <>
            <img src={"./admin_images/login.png"} className="img-fluid img-ratio" alt={"./public/admin_images/login.png"} />


            <div className="container">
                <div className="row g-3 justify-content-center ">
                    <div className="col-5 signup-body-part login-pos">
                        <h3 className="login-head " >Login</h3>
                        <form className="row g-3">

                            <div className="col-md-12">
                                <label for="inputEmail4" className="form-label login-sub-text">Email</label>
                                <input type="email" className="form-control login-input" id="inputEmail4" value={email} onChange={(e) => { setEmail(e.target.value); }} placeholder="Enter Your Email" />
                                {errors && !email && <span className='error'>*Login-Id is required</span>}
                                {errors && !emailregx.test(email) && <span className='error'>*Enter A Correct Login-Id</span>}
                            </div>
                            <div className="col-md-12">
                                <label for="inputPassword4" className="form-label login-sub-text">Password</label>
                                <input type="password" className="form-control login-input" id="inputPassword4" value={password} onChange={(e) => { setpassword(e.target.value); }} placeholder="Enter Your Password" />
                                {errors && !password && <span className='error'>*Password is required</span>}
                            </div>

                            <div className="col-12 sign-up-btn mt-5" >
                                <button type='button' onClick={login} className="btn btn-transparent">Login</button>
                                <button type='button' className="btn btn-transparent"><Link to='/signup' className="signup-btn">sign-up</Link></button>

                            </div>
                            <div className="col-12 sign-up-btn mt-5" >
                                {(verification === true) ? "" :

                                    <div className='email-alert-div'>
                                      <span className='email-alert' >Please Verify Your email   <button onClick="" className=" btn-email-alert">Resend Link</button></span>
                                    </div>
                                    }
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}
export default Login;