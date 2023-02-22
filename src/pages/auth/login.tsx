import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const Login: NextPage = () => {
  const handleLoginClick = () => {
    void signIn("discord", { callbackUrl: "/" });
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-center">Welcome to Note Taker!</Card.Header>
            <Card.Body className="d-flex justify-content-center">
              <Card.Text>Before you can take notes you must first login!</Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-center">
              <Button variant="primary" onClick={() => handleLoginClick()}>
                Login
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

// noinspection JSUnusedGlobalSymbols
export default Login;
