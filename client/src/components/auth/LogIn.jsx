/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-did-update-set-state */
import React from "react";
import { Redirect } from "react-router-dom";
import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";

import common from "./common";

// LogIn node component
class LogIn extends React.Component {
  state = {
    password: "",
    email: "",
    errorMsg: null
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      // Check for an error with an id of "LOGIN_FAIL"
      if (error.id === "LOGIN_FAIL") {
        this.setState({ errorMsg: error.msg.msg.msg });
      } else this.setState({ errorMsg: null });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { loginUser } = this.props;

    // Attempt to log in
    loginUser({ email, password });
  };

  render() {
    const { errorMsg } = this.state;
    const { isAuthenticated } = this.props;

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

    const errorAlert = errorMsg ? (
      <Alert color="danger">{errorMsg}</Alert>
    ) : null;

    if (isAuthenticated) return <Redirect to="/" />;

    return (
      <Form onSubmit={this.handleSubmit} className="log-in wrapper">
        {errorAlert}
        {formFields}
        <Button outline>Continue</Button>
      </Form>
    );
  }
}

LogIn.propTypes = {
  isAuthenticated: PropTypes.bool,
  loginUser: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired
};

LogIn.defaultProps = {
  isAuthenticated: false
};

export default LogIn;
