import React from "react";
import MainScreen from "../MainScreen";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Loading from "../../components/Loding";
import ErrorMessage from "../ErrorMessage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    setError(false);
    e.preventDefault();

    try {
      const config = {
        header: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);
      const { data } = await axios.post("/login", { email, password }, config);

      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setError(false);
      setLoading(false);
      navigate("/blogs");
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <MainScreen title="Login">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer ? <Link to="/register">Register Here</Link>
        </Col>
      </Row>
    </MainScreen>
  );
};

export default LoginScreen;
