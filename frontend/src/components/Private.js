import React from "react";
import {Outlet,Navigate} from 'react-router-dom';

export default function Private(){
    
    const auth = localStorage.getItem('signups');
    return  auth ? <Outlet /> : <Navigate to='/signup' /> 
}