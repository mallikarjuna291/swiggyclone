import { useState, useEffect } from "react";
import { INSERT_DISHES } from "./Queries/INSERT_DISHES";
import { useMutation, useQuery } from "@apollo/client";
import { RESTAURANTS_QUERY } from "./Queries/RESTAURANTS_QUERY";
import { DISHES_QUERY } from "./Queries/DISHES_QUERY";
import { Form } from "react-bootstrap";
import {
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UPDATE_STATUS } from "./Queries/UPDATE_STATUS";

import Navbar from "./Navbar";
import Loader from "./Loader";
const OwnerView = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  
  const { loading, error, data } = useQuery(RESTAURANTS_QUERY);
  let restaurantid = "";
  const uri = window.location;
  const encoded = decodeURIComponent(uri);
  const hash = encoded.split("/");
  const restaurantInfo = hash[4];

  // used to get the details of restaurant owner based on login details
  data?.Restaurants.map((each) => {
    if (
      each.RestaurantName === restaurantInfo ||
      each.Userid === restaurantInfo
    ) {
      restaurantid = each.Restaurantid;
    }
  });

  // used to filter to get the restarant id
  const arr = data?.Restaurants.filter((each) => {
    return restaurantid === each.Restaurantid;
  });
  const status = arr?.[0]?.Status;
  const [type, setType] = useState("");

  const updateCacheRestaurants = (cache, { data }) => {
    const currentValue = cache.readQuery({
      query: RESTAURANTS_QUERY,
    });
    const updatedData = data;
    cache.writeQuery({
      query: RESTAURANTS_QUERY,
      data: { Restaurants: [updatedData, ...currentValue.Restaurants] },
    });
  };

  const updateCachedishes = (cache, { data }) => {
    const currentValue = cache.readQuery({
      query: DISHES_QUERY,
    });
    const updatedData = data;
    cache.writeQuery({
      query: DISHES_QUERY,
      data: { Dishes: [updatedData, ...currentValue.Dishes] },
    });
  };
  // when clicks on add orders , INSERT_DISHES will be called and dishes will be inserted
  const [addrestaurant] = useMutation(INSERT_DISHES, {
    variables: {
      Description: description,
      Name: name,
      Price: price,
      Restaurantid: restaurantid,
    },
    update: updateCachedishes,
  });

  const [updateStatus] = useMutation(UPDATE_STATUS, {

    onError: (err) => {
      console.log(err)
    },
  });
  const { data: data1 } = useQuery(DISHES_QUERY);
  const row = data1?.Dishes;

  // used to get dishes of the particular restaurant
  var rows = row?.filter(function (item) {
    return item.Restaurantid === restaurantid;
  });
  function handleSubmit(event, variables) {
    event.preventDefault();
    addrestaurant({ variables });
    setName("");
    setDescription("");
    setPrice("");
  }
  if (loading) return <Loader />;
 
  function handlestatus(event, type) {
    event.preventDefault();
    updateStatus({
      variables: {
        Restaurantid: restaurantid,
        Status: type,
      },

      update: updateCacheRestaurants,
    });
 
  }

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", marginLeft: "0.5%", marginTop: "1%" }}>
        <h6
          id="demo-simple-select-label"
          style={{ marginTop: "10px", marginRight: "10px" }}
        >
          Select Status
        </h6>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="select"
          onChange={(e) => setType(e.target.value)}
          style={{ width: "150px", height: "50px" }}
        >
          <MenuItem value="opened">Open</MenuItem>
          <MenuItem value="closed">Close</MenuItem>
        </Select>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          onClick={(event) => handlestatus(event, type)}
          style={{ marginBottom: "20px", height: "50px" }}
        >
          Click to confirm
        </Button>
        
      </div>
      <p style={{ marginLeft: "0.5%" }}>current status : {status}</p>
      <Form onSubmit={handleSubmit} style={{ marginLeft: "0.5%" }}>
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

        <Button
          variant="outlined"
          type="submit"
          value="Submit"
          style={{ color: "blue" }}
        >
          Add item
        </Button>
      </Form>
    </div>
  );
};

export default OwnerView;
