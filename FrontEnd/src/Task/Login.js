import React, { Component, lazy, Suspense } from "react";
import { Redirect, Router, Route, Link, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Form, Button, Col, InputGroup, Container } from "react-bootstrap";
// import "./Login.css";
// import Footer from "../Hotel/FrontEnd/Footer";

// const Dashboard = lazy(() => import("./Dashboard"));
const history = createBrowserHistory();

const baseUrl = "http://127.0.0.1:8888";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      login: false,
      store: null,
    };
  }

  _login = () => {
    return fetch("http://localhost:8888/api/v1/user/auth", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    });
  };

  setToken = (token) => {
    localStorage.setItem(
      "login",
      JSON.stringify({
        login: true,
        token,
      })
    );
  };

  login() {
    this._login()
      .then((data) => data.json())
      .then((result) => {
        const { token } = result;
        if (!token) alert("login success");

        this.setToken(token);
        this.setState({ login: true });
      })
      .catch((err) => {
        console.log(err);
        alert("login failed");
      });
  }
  post() {}
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { email, password } = this.state;

    return (
      <>
        {!this.state.login ? (
          // <div className="vishal3">
          <Container
            fluid
            style={{
              backgroundColor: " #e0e2e4",
              height: "100vh",
              // height: "auto"
            }}
          >
            <Form className=" offset-5" style={{ paddingTop: 150 }}>
              <h4>User Login</h4>

              <Form.Row>
                <Form.Group as={Col} md="4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    placeholder="email"
                    name="email"
                    value={email}
                    onChange={this.changeHandler}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={this.changeHandler}
                  />
                </Form.Group>
              </Form.Row>

              <Button
                variant="primary"
                onClick={() => {
                  this.login();
                }}
              >
                Login
              </Button>
            </Form>
            {/* </div> */}
          </Container>
        ) : (
          <Redirect to="/welcome" />
        )}
      </>
    );
  }
}

export default Login;
