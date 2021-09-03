import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import history from 'appHistory';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import { getFromLocalStorage } from 'helpers';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    const token = getFromLocalStorage('token');

    if (token && location.pathname === '/') {
      history.push('/main');
    }
  }, [location.pathname]);

  return (
    <React.Fragment>
      <Header />
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        {props.children}
      </Container>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Layout;
