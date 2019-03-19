import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

import routes from "./routes";
import { storeOperations } from "./store";
import { NavBar } from "./components/layouts";

class App extends React.Component {
  componentDidMount() {
    const { loadUser } = this.props;
    loadUser();
  }

  render() {
    const appRoutes = routes.appRoutes.map(route => {
      const { exact, path, component, key } = route;

      return (
        <Switch key={key}>
          <Route exact={exact} path={path} component={component} />
        </Switch>
      );
    });

    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          {appRoutes}
        </div>
      </BrowserRouter>
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
