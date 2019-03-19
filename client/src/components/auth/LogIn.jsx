/* eslint-disable react/no-unused-state */
import React from "react";
// eslint-disable-next-line object-curly-newline
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import common from "./common";

// LogIn node component
class LogIn extends React.Component {
  state = {
    password: "",
    email: "",
    error: null
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    e.target.reset();
  };

  render() {
    const formFields = common.logInInputFields.map(field => (
      <FormGroup key={field.id}>
        <Label for={field.id}>{field.placeholder}</Label>

        <Input
          type={field.type}
          onChange={this.handleChange}
          id={field.id}
          name={field.name}
        />
      </FormGroup>
    ));

    return (
      <Form onSubmit={this.handleSubmit} className="log-in wrapper">
        {formFields}
        <Button outline>Continue</Button>
      </Form>
    );
  }
}

export default LogIn;
