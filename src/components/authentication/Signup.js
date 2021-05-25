import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import CenteredContainer from "./centeredContainer";
export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const history = useHistory();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //adding error message here
  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("passwords doesnt match ");
    }

    //validation checks
    try {
      setError("");
      setLoading(true);

      await signup(emailRef.current.value, passwordRef.current.value);

      history.push("/");
    } catch {
      setError("Failed to create an account ");
    }

    setLoading(false);
  }
  return (
    <>
      <CenteredContainer>
        <div>
          <Card.Body>
            <h2 className="text-center mb-4"> Signup </h2>
            {error && <Alert variant="danger"> {error} </Alert>}{" "}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label> Email </Form.Label>{" "}
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>{" "}
              <Form.Group id="password">
                <Form.Label> Password </Form.Label>{" "}
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>{" "}
              <Form.Group id="confirm-password">
                <Form.Label> Confirm Password </Form.Label>{" "}
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>{" "}
              <Button className="w-100" disabled={loading} type="submit">
                Sign Up{" "}
              </Button>{" "}
            </Form>{" "}
          </Card.Body>{" "}
          <Card.Body>
            <div className="w-100 text-center mt-2">
              Already have and account ? <Link to="/login">Login </Link>
            </div>{" "}
          </Card.Body>{" "}
        </div>
      </CenteredContainer>
    </>
  );
}
