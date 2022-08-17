import * as React from "react";

import { Link, Outlet, useNavigate } from "react-router-dom";
import image3 from "../Images/image1.png";
import { Fragment } from "react";
import { useParams } from "react-router-dom";

import { useState } from "react";
const Navbar = (props) => {
  const [pages, setPages] = React.useState();
  const [homepath, setHomepath] = useState("");
  const navigate = useNavigate();

  const type = window?.location?.href?.split("/");
  const accountType = type[3];
  console.log(type);
  const urlparams = useParams();
  console.log(window.location, urlparams.userid);
  const userid = urlparams.userid;

  const handleclose = () => {
    navigate("/");
  };

  React.useEffect(() => {
    const type = window?.location?.href?.split("/");

    const accountType = type[3];
    const homepath = accountType === "customer" ? `/customer/${userid}` : `/`;
    setHomepath(homepath);
    if (accountType === "customer") {
      const pages = [
        {
          name: "Dishes",
          path: `/customer/${userid}`,
        },
        {
          name: "Orders",
          path: `/customer/${userid}/orders`,
        },
       
      ];
      setPages(pages);
    }
  }, []);

  return (
    <div >
      <div
        style={{
          margin: 0,
          display: "flex",
          height: "80px",
          
          backgroundColor: "#6E85B7",
        }}
      >
        <Link style={{ height: "80px", marginRight: "6%" }} to={homepath}>
          <img src={image3} style={{ height: "80px" }} />
        </Link>

        <div style={{ display: "flex" }}>
          {" "}
          {pages?.map((page) => (
            <Link
              key={page.name}
              to={page.path}
              style={{
            
                color: "white",
                alignSelf: "center",
                textDecoration: "none",
                paddingRight: "80%"
              }}
            >
              {page.name}
            </Link>
          ))}
        </div>

        <Link
          to="/"
          style={{
            flex: 1,
            color: "white",
            alignSelf: "center",
            paddingRight: "2%",
            textDecoration: "none",
            position: "absolute",
    right: 0
          }}
        >
          Log out
        </Link>
      </div>
      <Outlet />
    </div>
  );
};
export default Navbar;
