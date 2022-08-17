import { useMutation, useQuery } from "@apollo/client";
import { DISHES_QUERY } from "../Queries/DISHES_QUERY";
import { useNavigate } from "react-router-dom";
import { INSERT_ORDERS } from "../Queries/INSERT_ORDERS";
import { ORDERS_QUERY } from "../Queries/ORDERS_QUERY";
import { USERS_QUERY } from "../Queries/USERS_QUERY";
import { RESTAURANTS_QUERY } from "../Queries/RESTAURANTS_QUERY";
import {
  Card,
  CardActions,
  Button,
  Grid,
  CardContent,
  Paper,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import Typography from "@mui/material/Typography";
import Navbar from "../Components/Navbar";

import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import Loader from "../Components/Loader";
import { useState } from "react";
const CustomerView = () => {
  const [showData, setShowData] = useState([]);
  const [searchkey, setSearchKey] = useState("");
  const navigate = useNavigate();
  const uri = window.location; // window.location gives us the url
  const encoded = decodeURIComponent(uri);
  const hash = encoded.split("/");
  const userid = hash[4];
  let extracteduserid = "";

  const { loading, error, data } = useQuery(DISHES_QUERY);

  const row = data?.Dishes;
  const { data: data1 } = useQuery(USERS_QUERY);
  const { data: data2 } = useQuery(RESTAURANTS_QUERY);

  // openedRestaurants gives us the restauranta which status is opened only.
  const openedRestaurants = data2?.Restaurants?.filter((each) => {
    return each.Status === "opened";
  });
  const arr = [];

  // this functions helps us to get array of restaurants which are opened
  openedRestaurants?.map((each) => {
    arr.push(each?.Restaurantid);
  });

  // this functions helps us to get the user who is matched with email in url
  data1?.users?.map((each) => {
    if (each.Email === hash[4]) {
      extracteduserid = each.Userid;
    }
  });
  // this function helps to get list of open restaurants from restaurants table
  const filteredByValue = data?.Dishes?.filter((each) => {
    if (arr.includes(each.Restaurantid)) {
      return each.Restaurantid;
    }
  });

  const finaluserid = hash[4]?.includes("@") ? extracteduserid : userid;
  // helps to update query when we change/update anything related to it
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

  // used to add orders to order table in database
  const [addorders] = useMutation(INSERT_ORDERS, {
    update: updateCache,
  });
  // this function triggers when user clicks on order button
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
  if (loading) return <Loader />;

  //this function trigger when we click on orders in navbar and to redirect
  function goToOrders() {
    navigate(`/customer/${userid}/orders`);
  }
  const pages = ["Orders"];
  const filteredBySearch = filteredByValue?.filter((item) => {
    return item.Name.toLowerCase().includes(searchkey);
  });

  return (
    <>
      <Navbar
        pages={pages}
        comp={
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",

              marginTop: "20px",

              marginLeft: "21%",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search dishes"
              inputProps={{ "aria-label": "Search dishes" }}
              onChange={(event) => {
                const searchkey = event.target.value.toLowerCase();
                setSearchKey(searchkey);
              }}
            />

            <SearchIcon />
          </Paper>
        }
        handleClick={goToOrders}
      />

      <Grid container spacing={4} style={{ padding: "8px" }}>
        {filteredBySearch?.map((value) => {
          return (
            <Grid item>
              <Card sx={{ minWidth: 250, maxWidth: 250 }}>
                <CardContent>
                  <div style={{ display: "flex" }}>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                      style={{ margin: "10px", marginRight: "60px" }}
                    >
                      Name
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                      style={{ margin: "10px" }}
                    >
                      {value.Name}
                    </Typography>
                  </div>

                  <div style={{ display: "flex" }}>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                      style={{ margin: "10px", marginRight: "23px" }}
                    >
                      Description
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                      style={{ margin: "10px" }}
                    >
                      {value.Description}
                    </Typography>
                  </div>
                  <div style={{ display: "flex" }}>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                      style={{ margin: "10px", marginRight: "60px" }}
                    >
                      Price
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                      style={{ margin: "10px" }}
                    >
                      {value.Price}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <Button
                    variant="outlined"
                    startIcon={<DeliveryDiningIcon />}
                    type="submit"
                    value={value.Restaurantid}
                    style={{ color: "blue", marginLeft: "10px" }}
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
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
export default CustomerView;
