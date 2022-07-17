import React from 'react';
import { Login } from './Login';
import Signup from './SignUp';
import {Routes, Route} from 'react-router-dom';
import CustomerView from './CustomerView';
import  OwnerView  from './OwnerView';
import Orders from './Orders';



function Home() {
   
  return (
    <div >
         <div style={{marginBottom:"30px"}}></div>
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/customer/:userid" element={<CustomerView/>} />
          <Route path="/owner/:restaurantname" element={<OwnerView/>} />
          <Route path="customer/:userid/orders" element={<Orders/>}/>
        </Routes>
    </div>
  );
}


export default Home