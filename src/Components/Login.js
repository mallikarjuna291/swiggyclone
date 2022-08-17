import { useQuery } from "@apollo/client";
import { useState } from "react";
import { USERS_QUERY } from "../Queries/USERS_QUERY";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import InputIcon from "@mui/icons-material/Input";
import Loader from "./Loader";
import image2 from "../Images/image2.png";
export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, data } = useQuery(USERS_QUERY);
  const [errorlogin, setError] = useState(false);
  if (loading) return <Loader />;
  if (error) return <p>Something went wrong</p>;

  // when we click on signup this function will trigger and helps us to navigate to signup page
  const navigatetosignup = () => {
    navigate("/signup");
  };

  /* 
  In this function we are checking 2 condtions
  1. Checking user credentials
  2. Checking the type of user i.e, customer or restaurant owner
   */
  function handleSubmit(event, email, password) {
    event.preventDefault();
    data.users.map((each) => {
      if (email === each.Email && password === each.Password) {
        if (each.Type === "customer") {
          navigate(`/customer/${each.Userid}`);
        } else {
          navigate(`/owner/${each.Userid}`);
        }
      } else {
        setError(true);

        setTimeout(() => {
          setError(false);
        }, 5000);
      }
    });
  }

  return (
    <div>
      <img
        src={image2}
        style={{ width: "25%", marginLeft: "40%", color: "blue" }}
      />
      <Form
        onSubmit={(event) => handleSubmit(event, email, password)}
        style={{ marginLeft: "30%", width: "40%" }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            placeholder="Enter email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div style={{ display: "flex" }}>
          <Button
            variant="outlined"
            type="submit"
            startIcon={<LoginIcon />}
            style={{ color: "#2155CD" }}
          >
            Log in
          </Button>
          <Button
            variant="outlined"
            type="submit"
            style={{ color: "#2155CD", marginLeft: "15px" }}
            startIcon={<InputIcon />}
            onClick={navigatetosignup}
          >
            Sign Up
          </Button>
        </div>

        {errorlogin && (
          <div style={{ color: "red", marginTop: "5px" }}>
            Please check Username and password!
          </div>
        )}
      </Form>
    </div>
  );
};
