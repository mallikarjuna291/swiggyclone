import { useMutation, useQuery } from "@apollo/client";
import { ORDERS_QUERY } from "./Queries/ORDERS_QUERY";
import { DELETE_ORDERS } from "./Queries/DELETE_ORDERS";
import { USERS_QUERY } from "./Queries/USERS_QUERY";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Navbar from "./Navbar";
import Loader from "./Loader";
const Orders = () => {
  const { loading, error, data } = useQuery(ORDERS_QUERY);
  const navigate = useNavigate();
  const uri = window.location;
  const encoded = decodeURIComponent(uri);
  const hash = encoded.split("/");
  const userid = hash[4];
  let extracteduserid = "";
  const { data: data1 } = useQuery(USERS_QUERY);

  // helps us to find user related orders
  data1?.users?.map((each) => {
    if (each.Email === hash[4]) {
      extracteduserid = each.Userid;
    }
  });
  const finaluserid = hash[4]?.includes("@") ? extracteduserid : userid;

  // helps us to filter orders to the specific logged in user
  const filtereddata = data?.Orders?.filter((each) => {
    return each.Userid === finaluserid;
  });

  // helps to update query on updating orders query
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

  // used to delete orders
  const [deleteorders] = useMutation(DELETE_ORDERS, {
    update: updateCache,
  });

  // when user clicks on cancel , DELETE_ORDERS query will be called and deletes particular item
  function handleSubmit(event, orderid) {
    deleteorders({
      variables: {
        Orderid: orderid,
      },
    });
  }
  function goToDishes() {
    navigate(`/customer/${userid}`);
  }
  if (loading) return <Loader />;
  const pages = ["Dishes List"];
  return (
    <>
      <Navbar pages={pages} handleClick={goToDishes} />
      <Typography
        variant="h5"
        style={{ marginTop: "10px", marginLeft: "13px" }}
      >
        List of orders
      </Typography>
      ;
      {filtereddata?.map((each) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{each.Name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p>Price : {each.Price}</p>
            <p>Restaurant id : {each.Restaurantid}</p>
            <Button
              variant="outlined"
              type="submit"
              onClick={(event) => handleSubmit(event, each.Orderid)}
              startIcon={<CancelIcon />}
              style={{ color: "#C84B31" }}
            >
              Cancel
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default Orders;
