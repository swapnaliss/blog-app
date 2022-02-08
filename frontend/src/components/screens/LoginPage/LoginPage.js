import React from "react";
import { Container, Row, Button } from "react-bootstrap";
import "../LoginPage/LoginPage.css";
const LoginPage = () => {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="into-text">
            <div>
              <h1>Welcome</h1>
              <div>
                <a href="/login">
                  <Button size="lg" className="logBtn">
                    Login
                  </Button>
                </a>
                <a href="/register">
                  <Button size="lg">Sign Up</Button>
                </a>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
