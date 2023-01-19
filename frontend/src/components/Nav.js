import React, { useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import brand_logo from "../images/events-r-us.svg"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from "@mui/system";
import Login from "../User_Component/Pages/Login";
const Nav = (props) => {
 useParams();
   
  let auth;
  let email_verification;

  auth = localStorage.getItem('signups');
  email_verification = JSON.parse(auth);



  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/signup');
  }
  const location = useLocation();
  let user_panel;


  (location.pathname === "/signup" || location.pathname === "/admin" || location.pathname === "/add" || location.pathname === "/login" ||
    location.pathname === `/profile`)
    ? user_panel = true : user_panel = false;

const [open,setopen]=useState(false);
  return (


    <>

      <nav className="navbar navbar-expand-lg bg-light nav-fit">
        <div className="container-fluid">
          <Link to="/admin" className="navbar-brand">
            <img src={brand_logo} alt={brand_logo} width="150" height="80" />

          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {(props.front_p || user_panel) ?
            (auth && email_verification.verified === true) ?
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link active nav-link-color" aria-current="page" to="/admin">
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link nav-link-color" to="/add">
                      Add
                    </Link>
                  </li>


                  <li className="nav-item">

                    <Link to="/profile" className="nav-link nav-link-color">
                      Profile
                    </Link>
                  </li>

                  <li className="nav-item">

                    <Link onClick={logout} className="nav-link nav-link-color" to="/signup">
                      Logout
                    </Link>
                  </li>

                </ul>
              </div>
              :
              <div className="collapse navbar-collapse nav-login" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">

                    <Link to="/login" className="nav-link nav-link-color">
                      Login
                    </Link>


                  </li>
                  <li className="nav-item">


                    <Link to="/signup" className="nav-link nav-link-color">
                      Sign-up
                    </Link>
                  </li>
                </ul>


              </div>
            :
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active nav-link-color" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-color" to="/services">
                    Servises
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-color" to="/aboutus">
                    About
                  </Link>
                </li>


                <li className="nav-item">

                  <Link to="/gallery" className="nav-link nav-link-color">
                    Gallery
                  </Link>
                </li>

                <li className="nav-item">

                  <Link className="nav-link nav-link-color" to="/contact_us">
                    Contact-Us
                  </Link>
                </li>
                <li className="nav-item">

                  <Link className="nav-link nav-link-color" to="/contact_us">
                    Status
                  </Link>
                </li>
                <li className="nav-item signup-li">

                  <Link className="nav-link nav-link-color signup-mainbox" to="/">
                    <Box className='signup-box' onClick={()=>{setopen(true)}}>
                      <AccountCircleIcon className="profile-btn"/>
                      Login/Register
                    </Box>
                  </Link>
                </li>

              </ul>
            </div>




          }

        </div>
      </nav>
      <Login open={open} setopen={setopen}/>
    </>
  );
};

export default Nav;
