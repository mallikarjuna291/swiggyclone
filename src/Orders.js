import { useMutation, useQuery } from "@apollo/client";
import { ORDERS_QUERY } from "./Queries/ORDERS_QUERY";
import { DELETE_ORDERS } from "./Queries/DELETE_ORDERS";
import { USERS_QUERY } from "./Queries/USERS_QUERY";
import { Accordion, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const Orders = () => {
  const { loading, error, data } = useQuery(ORDERS_QUERY);
  const navigate = useNavigate();
  const uri = window.location;
  const encoded = decodeURIComponent(uri);
  const hash = encoded.split("/");
  const userid = hash[4];
  let extracteduserid=""
  const {data:data1}=useQuery(USERS_QUERY)

  const userinfo=data1?.users?.map((each)=>{
   
    if(each.Email===hash[4]){
      extracteduserid=each.Userid
    }
  
  })
  const finaluserid=hash[4]?.includes('@')?extracteduserid:userid
  const filtereddata = data?.Orders?.filter((each) => {
   
    return each.Userid === finaluserid;
  });
  
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
  const [deleteorders] = useMutation(DELETE_ORDERS, {
    update: updateCache,
  });
  
  function handleSubmit(event, orderid) {
    deleteorders({
      variables: {
        Orderid: orderid,
      },
    });
  
  }
  function goToDishes(){
    navigate(`/customer/${userid}`)
  }
 
 
  const pages = ["Dishes List"]
  return (<>
     <Navbar pages={pages} handleClick={goToDishes}/>
    <Accordion>
   
      <h4 style={{margin:'20px'}}>List of your orders</h4>
      {filtereddata?.map((each,index) => (
        <Accordion.Item eventKey={index}>
          <Accordion.Header>{each.Name}</Accordion.Header>
          <Accordion.Body>
            <p>Price : {each.Price}</p>
            <p>Restaurant id : {each.Restaurantid}</p>
            <Button
              type="submit"
              variant="outline-dark"
              style={{ marginBottom: "20px" }}
              onClick={(event) => handleSubmit(event, each.Orderid)}
            >
              Cancel
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
    </>
  );
};

export default Orders;
