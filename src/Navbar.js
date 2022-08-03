import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import image1 from "./Images/image1.png";
const settings = ["Logout"];

const Navbar = (props) => {
  const navigate = useNavigate();

  const handleclose = () => {
    navigate("/");
  };

  const pages = props.pages;
  const handleClick = props.handleClick;

  return (
    <AppBar position="static" sx={{ bgcolor: "#FBB454" }}>
      <Container style={{ margin: 0 }}>
        <Toolbar>
          <img src={image1} style={{ width: "8%", marginRight: "7%" }} />

          <Box sx={{ flexGrow: 1 }}>
            {pages?.map((page) => (
              <Button
                key={page}
                onClick={handleClick}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Button
            sx={{ color: "white", marginRight: "-30%" }}
            onClick={handleclose}
          >
            Log out
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
