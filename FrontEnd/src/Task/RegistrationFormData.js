import React from "react";
import { Form, Col, InputGroup, Container } from "react-bootstrap";
import { Router, Route, Link, Switch } from "react-router-dom";
import { Button } from "@material-ui/core";

import axios from "axios";
// import "./AddDish.css";

export default class RegistrationFormData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   id: "",
      name: "",
      email: "",

      hobbies: "",
      gender: "",
      profile: "",
      password: "",
      confirmpassword: "",
      mobile: "",
    };
  }
  componentDidMount(e) {
    console.log(e);
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fileSelectedHandler = (event) => {
    this.setState({
      profile: event.target.files[0],
    });
  };

  submit(event, id) {
    event.preventDefault();

    const data = new FormData();

    // data.append("id", this.state.id);
    data.append("name", this.state.name);
    data.append("email", this.state.email);
    data.append("hobbies", this.state.hobbies);
    data.append("gender", this.state.gender);
    data.append("password", this.state.password);
    data.append("confirmpassword", this.state.confirmpassword);

    data.append("mobile", this.state.mobile);

    data.append("profile", this.state.profile);

    axios.post("http://localhost:8888/api/v1/user", data).then(() => {
      this.componentDidMount();
      alert("user added");
    });
  }

  render() {
    return (
      <Container
        fluid
        style={{
          backgroundColor: "#cfe0e8",
          height: "100vh",
          // height: "auto"
        }}
      >
        <Form
          onSubmit={(e) => this.submit(e, this.state.id)}
          className=" offset-4"
          style={{ paddingTop: 50 }}
        >
          <h4>User Registration</h4>
          <Form.Row>
            <Form.Group as={Col} md="3" controlId="formGridPassword">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                name="name"
                value={this.state.title}
                onChange={this.changeHandler}
              />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="formGridAddress1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="email"
                name="email"
                value={this.state.email}
                onChange={this.changeHandler}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="3" controlId="formGridState">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder="mobile"
                name="mobile"
                value={this.state.mobile}
                onChange={this.changeHandler}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="3" controlId="formGridState">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="password"
                name="password"
                value={this.state.password}
                onChange={this.changeHandler}
              />
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="formGridZip">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="text"
                placeholder="confirmpassword"
                name="confirmpassword"
                value={this.state.confirmpassword}
                onChange={this.changeHandler}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="hobbies">
              <Form.Label>Hobbies</Form.Label>
              <Form.Control
                as="select"
                onChange={this.changeHandler}
                name="hobbies"
                value={this.state.hobbies}
              >
                <option value="Cricket">Cricket</option>
                <option value="Chess">Chess</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="formGridCity">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                onChange={this.changeHandler}
                name="gender"
                value={this.state.gender}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="formGridZip">
              <Form.Label>Profile</Form.Label>
              <Form.Control
                type="file"
                name="profile"
                onChange={(e) => this.fileSelectedHandler(e)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            &nbsp; &nbsp;&nbsp;
            <Button variant="contained" component={Link} to="/login">
              Login
            </Button>
          </Form.Row>
        </Form>
      </Container>
      //   </div>
    );
  }
}
