import { useState } from "react";
import { USER_DETAILS } from "./Queries/INSERT_USERDETAILS";
 import {  useMutation } from '@apollo/client';
import { Navigate } from "react-router";
import {Routes, Route, useNavigate} from 'react-router-dom';
import { INSERT_USERS } from "./Queries/INSERT_USERS";
import {Form,Button} from 'react-bootstrap'
const Signup=()=>{
  const navigate = useNavigate();
    const [name, setName] =useState('');
    const [email, setEmail] =useState('');
    const [gender, setGender] =useState('');
    const [type,setType]=useState('');
    const [password,setPassword]=useState('')
    const [restaurantname, setRestaurantname] =useState('');
    const [address,setAddress]=useState('');
    const [status,setStatus]=useState('')
    // const updateCache = (cache, { data }) => {
    //   const currentValue = cache.readQuery({
    //     query: BIO_QUERY,
    //   });
    //   const updatedData = data;
    //   cache.writeQuery({
    //     query: BIO_QUERY,
    //     data: { mytable: [updatedData, ...currentValue.mytable] },
    //   });
    // };

      const [adddetails] = useMutation(INSERT_USERS, {
        variables: {
          Name: name,
          Email: email,
          Gender:gender,
          Type:type,
          Password:password,
       
            RestaurantName:restaurantname,
            Address:address,
            Status:status
          
        
        },
        // update:updateCache
      });

      function handleSubmit(event,variables) {
        event.preventDefault();
        adddetails({ variables });
      
        type==='owner'?
          navigate(`/owner/${restaurantname}`):navigate(`/customer/${email}`)
        
      }
return  <Form onSubmit={(event)=>handleSubmit(event)} style={{margin:"12%"}}>
<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Name</Form.Label>
  <Form.Control type="text" placeholder="Enter name" name="name" value={name} onChange={e => setName(e.target.value)}/>
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicEmail" >
  <Form.Label>Email address</Form.Label>
  <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
  <Form.Text className="text-muted">
    We'll never share your email with anyone else.
  </Form.Text>
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Gender</Form.Label>
  <Form.Control type="text" placeholder="Enter Gender" name="gender" value={gender} onChange={e => setGender(e.target.value)}/>
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>User Type</Form.Label>
  <Form.Control type="text" placeholder="Enter customer/owner" name="type" value={type} onChange={e => setType(e.target.value)}/>
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Password</Form.Label>
  <Form.Control type="text" placeholder="Enter password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
</Form.Group>
{type==="owner"?
<div>
<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label> Restaurant Name</Form.Label>
  <Form.Control type="text" placeholder="Enter restaurant name" name="restaurantname" value={restaurantname} onChange={e => setRestaurantname(e.target.value)}/>
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Status</Form.Label>
  <Form.Control type="status" placeholder="Enter status" name="status" value={status} onChange={e => setStatus(e.target.value)}/>
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Address</Form.Label>
  <Form.Control type="text" placeholder="Enter address" name="address" value={address} onChange={e => setAddress(e.target.value)}/>
</Form.Group>
</div>:null
}

<Button variant="outline-dark" type="submit">
  Submit
</Button>
</Form>


}

export default Signup;