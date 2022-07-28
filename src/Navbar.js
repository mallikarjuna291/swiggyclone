import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

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
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              marginLeft: "-18px",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Swiggy
          </Typography>

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

          <Box sx={{ flexGrow: 0 }}>
            <Button
              key="logout"
              onClick={handleclose}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Log out
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
