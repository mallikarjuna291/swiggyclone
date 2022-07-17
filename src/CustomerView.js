import { useMutation, useQuery } from "@apollo/client";
import { DISHES_QUERY } from "./Queries/DISHES_QUERY";
import { RESTAURANT_DETAILS } from "./Queries/RESTAURANT_DETAILS";
import {Routes, Route, useNavigate} from 'react-router-dom';
import { USERS_QUERY } from "./Queries/USERS_QUERY";
import {Form,Button} from 'react-bootstrap'
import { isTypeSystemDefinitionNode } from "graphql";
import { INSERT_ORDERS } from "./Queries/INSERT_ORDERS";
import { ORDERS_QUERY } from './Queries/ORDERS_QUERY'
const CustomerView=()=>{
    const navigate = useNavigate();
    const uri = window.location;
  const encoded = decodeURIComponent(uri);
  const hash = encoded.split("/");
  const gmail = hash[4];
  console.log(hash)
    const {loading,error,data} =useQuery(DISHES_QUERY);
    console.log(data)
let userid=""
 const {data:data1}=useQuery(USERS_QUERY)
 console.log(data1)
const usersrow=data1?.users
const useridInfo=usersrow?.map((each)=>{
    if(each.Email===gmail){
         userid=each.Userid
    }
})
console.log(userid)
const updateCache = (cache, { data }) => {
  const currentValue = cache.readQuery({
    query: ORDERS_QUERY,
  });
  const updatedData = data;
  cache.writeQuery({
    query: ORDERS_QUERY,
    data: { Orders: [updatedData, ...currentValue.Orders] },
  });
};
    function handleSubmit(event) {
        event.preventDefault();
       navigate(`/customer/${userid}/orders`)
        
      }
      const [addorders]=useMutation(INSERT_ORDERS)
      function handleClick(event,restaurantid,name,itemid,price,userid){
        event.preventDefault();
        console.log(userid)
        navigate(`/customer/${userid}/orders`)
       addorders({
        variables:{
          Restaurantid:restaurantid,
          Userid:userid,
          Itemid:itemid,
          Name:name,
          Price:price
      }
       })
      }
    const row=data?.Dishes
    return <>
    <Button type="submit" variant="outline-dark" onClick={handleSubmit} style={{marginBottom:"20px"}}>Check Orders</Button>
        { row?.map((value,index)=>
  <div style={{display:'flex',margin:"5px"}} ><p style={{flex:1}}>{index+1}</p><p style={{flex:1}}>{value.Name}</p><p style={{flex:1}}>{value.Description}</p><p style={{flex:1}}>{value.Price}</p><Button  variant="outline-primary" type="submit" value={value.Restaurantid} onClick={(event)=>handleClick(event,value.Restaurantid,value.Name,value.Itemid,value.Price,userid)}>Order</Button></div>)}
    </>
   
  
}
export default CustomerView;