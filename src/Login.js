import { useQuery } from "@apollo/client";
import { useState } from "react";
import { USERS_QUERY } from "./Queries/USERS_QUERY";
import { useNavigate} from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import loginimage from './Images/login.jpg'
import Navbar from "./Navbar";
export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, data } = useQuery(USERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
  const navigatetosignup = () => {

    navigate("/signup");
  };
  function handleSubmit(event, email, password) {
    event.preventDefault();
    data.users.map((each) => {
      if (email === each.Email && password === each.Password) {
        if (each.Type === "customer") {
     
           navigate(`/customer/${each.Userid}`);
        } else {
          <Navbar/>
          navigate(`/owner/${each.Userid}`);
        }
      }
    });
  }

  return (
    <div>
    
    <img src={loginimage} style={{paddingLeft:'40%',height:'70%'}}/>
      <Form
        onSubmit={(event) => handleSubmit(event, email, password)}
        style={{ margin: "20%",marginTop:"8%" }}
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

        <Button
          variant="outline-dark"
          color="primary"
          value="Submit"
          type="submit"
        >
          Log in
        </Button>
        <Button
          variant="outline-dark"
          onClick={navigatetosignup}
          style={{ marginLeft: "15px" }}
        >
          Sign Up
        </Button>
      </Form>
    </div>
  );
};
