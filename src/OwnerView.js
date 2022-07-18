import { useState } from "react";
import { INSERT_DISHES } from "./Queries/INSERT_DISHES";
import { useMutation, useQuery } from "@apollo/client";
import { RESTAURANTS_QUERY } from "./Queries/RESTAURANTS_QUERY";
import { DISHES_QUERY } from "./Queries/DISHES_QUERY";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UPDATE_STATUS } from "./Queries/UPDATE_STATUS";
const OwnerView = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
const [type,setType]=useState("")
  const updateCache = (cache, { data }) => {
    const currentValue = cache.readQuery({
      query: DISHES_QUERY,
    });
    const updatedData = data;
    cache.writeQuery({
      query: DISHES_QUERY,
      data: { Dishes: [updatedData, ...currentValue.Dishes] },
    });
  };

  const { loading, error, data } = useQuery(RESTAURANTS_QUERY);
  let restaurantid = "";
  const uri = window.location;
  const encoded = decodeURIComponent(uri);
  const hash = encoded.split("/");
  const restaurantInfo = hash[4];

  data?.Restaurants.map((each) => {
    
    if (
      each.RestaurantName === restaurantInfo ||
      each.Userid === restaurantInfo
    ) {
    
      restaurantid = each.Restaurantid;
     
    }
  });

  const [addrestaurant] = useMutation(INSERT_DISHES, {
    variables: {
      Description: description,
      Name: name,
      Price: price,
      Restaurantid: restaurantid,
    },
    update: updateCache,
   
  });
const [updateStatus]=useMutation(UPDATE_STATUS)
  const { data: data1 } = useQuery(DISHES_QUERY);
  const row = data1?.Dishes;
  var rows = row?.filter(function (item) {
    return item.Restaurantid === restaurantid;
  });

  function handleSubmit(event, variables) {
    event.preventDefault();
    addrestaurant({ variables });
    setName('');setDescription('');setPrice('')
  }
  function handleClose(event) {
    event.preventDefault();
    navigate("/");
  }
  function handlestatus(event,type){
    event.preventDefault();
    updateStatus({ variables:{
      Restaurantid:restaurantid,
      Status:type
    } });
  }
  return (<>
  <div style={{display:"flex"}}>
  <Form.Select as="select" onChange={e => setType(e.target.value)} required style={{width:'150px',height:"50px"}}>
      <option>Select Status</option>
      <option value="opened" name="opened">Open</option>
      <option value="closed" name="closed">Close</option>
    
    </Form.Select>
  
    <Button
    type="submit"
    variant="outline-dark"
    onClick={(event)=>handlestatus(event,type)}
    style={{ marginBottom: "20px",height:'50px' }}>Click to confirm
    </Button>

    <Button
    type="submit"
    variant="outline-dark"
    onClick={handleClose}
    style={{ marginBottom: "20px",marginLeft:'70%' }}
  >
    Log out
  </Button>
  </div>
    <Form onSubmit={handleSubmit}>
      <div style={{ display: "flex", paddingBottom: "15px" }}>
        <h6 style={{ flex: 1 }}>S.No</h6>
        <h6 style={{ flex: 1 }}>Name</h6>
        <h6 style={{ flex: 1 }}>Description</h6>
        <h6 style={{ flex: 1 }}>Price</h6>
      </div>

      {rows?.map((value, index) => (
        <div style={{ display: "flex", paddingBottom: "15px" }}>
          <p style={{ flex: 1 }}>{index + 1}</p>
          <p style={{ flex: 1 }}>{value.Name}</p>
          <p style={{ flex: 1 }}>{value.Description}</p>
          <p style={{ flex: 1 }}>{value.Price}</p>
         
        </div>
        
      ))}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Form.Group>

      <Button variant="outline-primary" type="submit" value="Submit">
        Add item
      </Button>
    </Form></>
  );
};

export default OwnerView;
