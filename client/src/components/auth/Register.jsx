/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-did-update-set-state */
import React from "react";
import { Redirect } from "react-router-dom";
import {
  Alert,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import PropTypes from "prop-types";

import common from "./common";

// Registration node component
class Register extends React.Component {
  state = {
    errorMsg: null,
    fname: "",
    lname: "",
    email: "",
    password: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    registerUser: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired
  };

  static defaultProps = {
    isAuthenticated: false
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      // Check for an error with an id of "REGISTER_FAIL"
      if (error.id === "REGISTER_FAIL") {
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
    const { fname, lname, email, password } = this.state;
    const { registerUser } = this.props;

    // Attempt to register
    registerUser({ fname, lname, email, password });
  };

  render() {
    const { errorMsg } = this.state;
    const { isAuthenticated } = this.props;

    const formFields = common.regInputFields.map(field => (
      <Col key={field.id} md={field.col}>
        <FormGroup>
          <Label for={field.id}>{field.placeholder}</Label>

          <Input
            type={field.type}
            onChange={this.handleChange}
            id={field.id}
            name={field.name}
          />
        </FormGroup>
      </Col>
    ));

    const errorAlert = errorMsg ? (
      <Alert color="danger">{errorMsg}</Alert>
    ) : null;

    if (isAuthenticated) return <Redirect to="/profile" />;

    return (
      <Form onSubmit={this.handleSubmit} className="register wrapper">
        {errorAlert}
        <Row form>{formFields}</Row>
        <Button outline>Continue</Button>
      </Form>
    );
  }
}

export default Register;
