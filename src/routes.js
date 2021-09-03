import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import history from 'appHistory';
import Layout from 'layout';
import SignIn from 'screens/SignIn';
import MainPage from 'screens/MainPage';
import { getFromLocalStorage } from 'helpers';

const mapStateToProps = (state) => state;

const AppRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      getFromLocalStorage('token') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const PrivateRouter = connect(mapStateToProps)(AppRoute);

export default (
  <Router history={history}>
    <Layout>
      <Switch>
        <PrivateRouter path="/main" component={MainPage} />
        <Route exact path="/" component={SignIn} />
      </Switch>
    </Layout>
  </Router>
);

AppRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
