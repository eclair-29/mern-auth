// Register input fields
const regInputFields = [
  {
    name: "fname",
    id: "regFname",
    type: "text",
    placeholder: "First Name",
    col: 6
  },
  {
    name: "lname",
    id: "regLname",
    type: "text",
    placeholder: "Last Name",
    col: 6
  },
  {
    name: "email",
    id: "regEmail",
    type: "email",
    placeholder: "Email",
    col: 12
  },
  {
    name: "password",
    id: "regPassword",
    type: "password",
    placeholder: "Password",
    col: 12
  }
];

// Log In input fields
const logInInputFields = [
  {
    name: "email",
    id: "logInEmail",
    type: "email",
    placeholder: "Email"
  },
  {
    name: "password",
    id: "logInPassword",
    type: "password",
    placeholder: "Password"
  }
];

export default {
  regInputFields,
  logInInputFields
};
