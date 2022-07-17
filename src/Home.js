import React from 'react';


import {Form,Button} from 'react-bootstrap'
import { Login } from './Login';
import Signup from './SignUp';

import {Routes, Route, useNavigate} from 'react-router-dom';
import CustomerView from './CustomerView';
import  OwnerView  from './OwnerView';
import Orders from './Orders';



function Home() {
    const navigate = useNavigate();
   
    const navigateLogin = () => {
      // 👇️ navigate to /contacts
      navigate('/');
    };
  
    const navigatetosignup = () => {
      // 👇️ navigate to /
      navigate('/signup');
    };
    const uri = window.location;
    const encoded = decodeURIComponent(uri);
    const hash = encoded.split("/");
    console.log(hash.length)
  return (
    <div >
     
          
          {/* <Button variant="outline-dark" onClick={navigateLogin} style={{marginRight:"15px"}}>Login</Button> */}
           
         { hash.lenght<=4 && <Button variant="outline-dark" onClick={navigatetosignup} >Sign Up</Button>}
         <div style={{marginBottom:"30px"}}></div>
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/home" element={<Home/>} /> */}
          <Route path="/customer/:userid" element={<CustomerView/>} />
          <Route path="/owner/:restaurantname" element={<OwnerView/>} />
          <Route path="customer/:userid/orders" element={<Orders/>}/>
        </Routes>
    </div>
  );
}


export default Home