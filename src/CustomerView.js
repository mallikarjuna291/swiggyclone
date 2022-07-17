import { useMutation, useQuery } from "@apollo/client";
import { DISHES_QUERY } from "./Queries/DISHES_QUERY";

import { useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";

import { INSERT_ORDERS } from "./Queries/INSERT_ORDERS";
import { ORDERS_QUERY } from "./Queries/ORDERS_QUERY";
import { USERS_QUERY } from "./Queries/USERS_QUERY";
const CustomerView = () => {
  const navigate = useNavigate();
  const uri = window.location;
  const encoded = decodeURIComponent(uri);
  const hash = encoded.split("/");
  const userid = hash[4];
  let extracteduserid=""

  const { loading, error, data } = useQuery(DISHES_QUERY);
  const {data:data1}=useQuery(USERS_QUERY)
  const userinfo=data1?.users?.map((each)=>{
   
    if(each.Email===hash[4]){
      extracteduserid=each.Userid
    }
  
  })
   const finaluserid=hash[4]?.includes('@')?extracteduserid:userid

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
    navigate(`/customer/${userid}/orders`);
  }
  const [addorders] = useMutation(INSERT_ORDERS, {
    update: updateCache,
  });
  function handleClick(event, restaurantid, name, itemid, price, userid) {
    event.preventDefault();

    navigate(`/customer/${userid}/orders`);
    addorders({
      variables: {
        Restaurantid: restaurantid,
        Userid: finaluserid,
        Itemid: itemid,
        Name: name,
        Price: price,
      },
    });
  }
  const row = data?.Dishes;
  return (
    <>
      <Button
        type="submit"
        variant="outline-dark"
        onClick={handleSubmit}
        style={{ marginBottom: "20px" }}
      >
        Check Orders
      </Button>
      <div style={{ display: "flex", margin: "5px" }}>
          <h6 style={{ width: '24%'}}>S.No</h6>
          <h6 style={{ width:'24%' }}>Item Name</h6>
          <h6 style={{ width: '24%'}}>Description</h6>
          <h6 style={{ width: '24%' }}>Price</h6>
         
        </div>
      {row?.map((value, index) => (
        <div style={{ display: "flex", margin: "5px" }}>
          <p style={{ flex: 1 }}>{index + 1}</p>
          <p style={{ flex: 1 }}>{value.Name}</p>
          <p style={{ flex: 1 }}>{value.Description}</p>
          <p style={{ flex: 1 }}>{value.Price}</p>
          <Button
            variant="outline-primary"
            type="submit"
            value={value.Restaurantid}
            onClick={(event) =>
              handleClick(
                event,
                value.Restaurantid,
                value.Name,
                value.Itemid,
                value.Price,
                userid
              )
            }
          >
            Order
          </Button>
        </div>
      ))}
    </>
  );
};
export default CustomerView;
