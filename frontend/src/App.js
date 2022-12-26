import React, { useState } from 'react';
import './App.css';
import './Admin.css';
import './User.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Private from './components/Private';
import Login from './components/Login';
import Addproduct from './components/Addproduct';
import { BrowserRouter,Routes , Route} from "react-router-dom";
import Productlist from './components/Productlist';
import Update from './components/Update';
import Profile from './components/Profile';
import Email_verification from './components/Email_verification';
import Home from './User_Component/Home'
import Gallery from './User_Component/Pages/Gallery';
import Services from './User_Component/Pages/Services';
import AboutUS from './User_Component/Pages/AboutUS';

function App() {
  let [front,setfront]=useState(false);
  
  function parentalert(data){
 setfront(data);
  }
 
 
  return (
    <>

    <BrowserRouter>
    <Nav front_p={front}/>
    <Routes>
     <Route path="/" element={<Home />}/>
     <Route path='/gallery' element={<Gallery/>}/>
     <Route path='/services' element={<Services/>}/>
     <Route path='/aboutus' element={<AboutUS/>} />
      <Route element={<Private/>} >
        
     
      <Route path="/admin" element={<Productlist/> }  >  </Route>
      <Route path="/add" element={<Addproduct />}/>
      <Route path="/update/:id" element={<Update />}  />
      <Route path="signup/:id/verify/:token" element={<Email_verification />}/>
     <Route path="/logout" element={<h1>logout</h1>}/>
      <Route path="/profile" element={<Profile />}/>
     
      
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<Signup/>} />
    </Routes>
    <Footer  alert={parentalert}/>
    </BrowserRouter>
    
      
    </>
  );
}

export default App;
