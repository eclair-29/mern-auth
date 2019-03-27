import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

import { storeOperations } from "./store";
import { NavBar as Nav } from "./components/layouts";
import { Register, LogIn } from "./components/auth";
import { Profile } from "./components/pages";

class App extends React.Component {
  componentDidMount() {
    const { loadUser } = this.props;
    loadUser();
  }

  render() {
    const appRoutes = (
      <Switch>
        <Route exact path="/" component={Profile} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={LogIn} />
      </Switch>
    );

    return (
      <Router>
        <div className="App">
          <Nav />
          {appRoutes}
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(storeOperations.loadUser())
});

App.propTypes = {
  loadUser: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(App);
