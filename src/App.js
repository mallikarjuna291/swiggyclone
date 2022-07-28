import * as Sentry from '@sentry/react'
import { BrowserRouter  } from 'react-router-dom';
import { Login } from './Login';
import Signup from './SignUp';
import CustomerView from './CustomerView';
import  OwnerView  from './OwnerView';
import Orders from './Orders';
import {Routes, Route} from 'react-router-dom';

// Route is used to specify paths which helps us to change views

function App() {
  
  return (
    <div className="App" >   
     <BrowserRouter>
       <Routes>
         <Route path='/' element={<Login/>}/>
         <Route path="/signup" element={<Signup />} />
          <Route path="/customer/:userid" element={<CustomerView/>} />
          <Route path="/owner/:restaurantname" element={<OwnerView/>} />
          <Route path="customer/:userid/orders" element={<Orders/>}/>
       </Routes>
     </BrowserRouter>   
    </div>
  );
}

export default Sentry.withProfiler(App);
