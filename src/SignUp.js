import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { INSERT_USERS } from "./Queries/INSERT_USERS";
import { Form, Button } from "react-bootstrap";
import signup from "./Images/signup.jpg";
const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [restaurantname, setRestaurantname] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const navigateLogin = () => {
    navigate("/");
  };
  const [adddetails] = useMutation(INSERT_USERS, {
    variables: {
      Name: name,
      Email: email,
      Gender: gender,
      Type: type,
      Password: password,

      RestaurantName: restaurantname,
      Address: address,
      Status: status,
    },
  });

  function handleSubmit(event, variables) {
    event.preventDefault();
    adddetails({ variables });
    navigate("/");
    // type==='owner'?
    //   navigate(`/owner/${restaurantname}`):navigate(`/customer/${email}`)
  }
  return (
    <div>
      <img src={signup} style={{ paddingLeft: "40%", height: "70%" }} />
      <Form
        onSubmit={(event) => handleSubmit(event)}
        style={{ margin: "12%", marginTop: "8%" }}
      >
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
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
          <Form.Label>Gender</Form.Label>
          <Form.Select as="select" onChange={(e) => setGender(e.target.value)}>
            <option>Select Option</option>
            <option value="male" name="male">
              Male
            </option>
            <option value="female" name="female">
              Female
            </option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User Type</Form.Label>
          <Form.Select
            as="select"
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option>Select Option</option>
            <option value="owner" name="owner">
              Owner
            </option>
            <option value="customer" name="customer">
              Customer
            </option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {type === "owner" ? (
          <div>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label> Restaurant Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter restaurant name"
                name="restaurantname"
                value={restaurantname}
                onChange={(e) => setRestaurantname(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="status"
                placeholder="Enter status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
          </div>
        ) : null}

        <Button variant="outline-dark" type="submit">
          Sign Up
        </Button>
        <Button
          variant="outline-dark"
          onClick={navigateLogin}
          style={{ marginLeft: "15px" }}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
