import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser, authenticate, unauthenticate } from '../../../redux/userRedux.js';

import styles from './Header.module.scss';

const authenticationHandler = (user) => {
  user.authenticated ? unauthenticate(user) : authenticate(user);
};

const logoutHandler = (user) => {
  user.authenticated ? unauthenticate() : null();
};

const loginHandler = (user) => {
  !user.authenticated ? authenticate() : null();
};

const Component = ({ className, user }) => (
  <div className={clsx(className, styles.root)}>
    {user.authenticated ? (
      <div>
        <Button variant="contained" color="primary" href="/">
          My ads
        </Button>
        <Button className={styles.logout} variant="contained" color="primary" href="/" onClick={() => logoutHandler(user)}>
          Logout
        </Button>
      </div>
    ) : (
      <Button variant="contained" color="primary" href="https://google.com" onClick={() => loginHandler(user)}>
        Login with Google
      </Button>
    )}
    <Button className={styles.goBack} variant="contained" color="primary" href="/">
      Go back to homepage
    </Button>
    {/* temporarily */}
    <Button variant="contained" color="primary" onClick={() => authenticationHandler(user)}>
      Change user permissions
    </Button>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: (payload) => dispatch(authenticate(payload)),
  unauthenticate: (payload) => dispatch(unauthenticate(payload)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
