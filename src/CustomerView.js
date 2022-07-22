import { useMutation, useQuery } from "@apollo/client";
import { DISHES_QUERY } from "./Queries/DISHES_QUERY";

import { useNavigate } from "react-router-dom";


import { INSERT_ORDERS } from "./Queries/INSERT_ORDERS";
import { ORDERS_QUERY } from "./Queries/ORDERS_QUERY";
import { USERS_QUERY } from "./Queries/USERS_QUERY";
import { RESTAURANTS_QUERY } from "./Queries/RESTAURANTS_QUERY";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
const CustomerView = () => {
  const navigate = useNavigate();
  const uri = window.location;
  const encoded = decodeURIComponent(uri);
  const hash = encoded.split("/");
  const userid = hash[4];
  let extracteduserid=""

  const { loading, error, data } = useQuery(DISHES_QUERY);
  const row = data?.Dishes;
  const {data:data1}=useQuery(USERS_QUERY)
  const {data:data2}=useQuery(RESTAURANTS_QUERY)
  const openedRestaurants=data2?.Restaurants?.filter((each)=>{
    return each.Status==="opened"
  })
  const arr=[]
const statusdata=openedRestaurants?.map((each)=>{
  arr.push(each?.Restaurantid)
})
  const userinfo=data1?.users?.map((each)=>{   
    if(each.Email===hash[4]){
      extracteduserid=each.Userid
    }  
  })


  const filteredByValue=data?.Dishes?.filter((each)=>{

    if(arr.includes(each.Restaurantid)){
      return each.Restaurantid
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
  function handleClose(event) {
    event.preventDefault();
    navigate("/");
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
  function goToDishes(){
    <Link to={`/customer/${userid}/orders`}>Orders</Link>
    navigate(`/customer/${userid}`)
  }

  
  function goToOrders(){
    navigate(`/customer/${userid}/orders`)
  } 
  const pages = ["Orders"]
  return (
    <>
     <Navbar pages={pages} handleClick={goToOrders}/>
    
     {filteredByValue?.map((value)=>{
     return  <Card  sx={{ minWidth: 150 }}>
      <CardContent>
      <div style={{display:'flex'}}>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom style={{margin:'10px',marginRight:'60px'}}>
      Name
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom style={{margin:'10px'}}>
        {value.Name}
        </Typography>
      </div>
       
      <div style={{display:'flex'}}>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom style={{margin:'10px',marginRight:'23px'}}>
      Description
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom style={{margin:'10px'}}>
          {value.Description}
        </Typography>
      </div>
      <div style={{display:'flex'}}>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom style={{margin:'10px',marginRight:'60px'}}>
      Price
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom style={{margin:'10px'}}>
         {value.Price}
        </Typography>
      </div>
      </CardContent>
      <CardActions>
      <Button variant="outlined" startIcon={<DeliveryDiningIcon />} type="submit"
            value={value.Restaurantid}
            style={{color:'blue',marginLeft:'10px'}}
            onClick={(event) =>
              handleClick(
                event,
                value.Restaurantid,
                value.Name,
                value.Itemid,
                value.Price,
                userid
              )
            }>
  Order
</Button>
   
      </CardActions>
    </Card>
     })}
    </>
  );
};
export default CustomerView;
