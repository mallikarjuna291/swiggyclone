import * as React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import image3 from "../Images/image1.png";

const Navbar = (props) => {
  const navigate = useNavigate();

  const handleclose = () => {
    navigate("/");
  };

  const pages = props.pages;
  const handleClick = props.handleClick;

  return (
    <div
      style={{
        margin: 0,
        display: "flex",
        height: "80px",
        backgroundColor: "#6E85B7",
      }}
    >
      <img src={image3} style={{ width: "9%", marginRight: "6%" }} />

      {pages?.map((page) => (
        <Button
          key={page}
          onClick={handleClick}
          style={{ flex: 2, color: "white", justifyContent: "start" }}
        >
          {page}
        </Button>
      ))}
<div>{props.comp}</div>
      <Button
        style={{
          flex: 1,
          color: "white",
          justifyContent: "end",
          paddingRight: "2%",
        }}
        onClick={handleclose}
      >
        Log out
      </Button>
    </div>
  );
};
export default Navbar;
