import {useQuery} from '@apollo/client'
import { ORDERS_QUERY } from './Queries/ORDERS_QUERY'
import {Accordion,Button} from 'react-bootstrap';
import {Routes, Route, useNavigate} from 'react-router-dom';
const Orders=()=>{
    const {loading,error,data}=useQuery(ORDERS_QUERY)
    console.log(data)
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
      function handleSubmit(event,variables) {
        event.preventDefault();
      
        
      }
      const uri = window.location;
      const encoded = decodeURIComponent(uri);
      const hash = encoded.split("/");
      const userid = hash[4];
      const filtereddata=data?.Orders?.filter((each)=>{
        return each.Userid===userid
      })
     
   
// const {data:data1}=useQuery
      // const navigatetoback = () => {
      //   // 👇️ navigate to /contacts
      //   navigate('/');
      // };
      
 return  <Accordion>
  {/* <Button type="submit" variant="outline-dark" style={{marginBottom:"20px"}}>Go to Menu List</Button> */}
 <h4>Orders</h4>
 {filtereddata.map((each)=>
    <Accordion.Item eventKey="0">
   <Accordion.Header>{each.Name}</Accordion.Header>
   <Accordion.Body>
     <p>Price : {each.Price}</p>
     <p>Restaurant id : {each.Restaurantid}</p>
   </Accordion.Body>
 </Accordion.Item>
 )}

</Accordion>
}

export default Orders;