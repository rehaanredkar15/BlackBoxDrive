import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";
import CenteredContainer from "./centeredContainer";
import { Link, useHistory } from "react-router-dom";
export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  // const passwordConfirmRef = useRef();
  const { login } = useAuth();
  const history = useHistory();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //adding error message here
  async function handleSubmit(e) {
    e.preventDefault();

    //validation checks
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to Signin ");
    }

    setLoading(false);
  }
  return (
    <>
      {" "}
      <CenteredContainer>
        <div>
          <Card.Body>
            <h2 className="text-center mb-4"> Login </h2>
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
              <Button className="w-100" disabled={loading} type="submit">
                Log In{" "}
              </Button>{" "}
            </Form>{" "}
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password? </Link>
            </div>
          </Card.Body>{" "}
          <Card.Body>
            <div className="w-100 text-center mt-2">
              Need an account ?<Link to="/signup">SignUp </Link>
            </div>
          </Card.Body>{" "}
        </div>
      </CenteredContainer>
    </>
  );
}
