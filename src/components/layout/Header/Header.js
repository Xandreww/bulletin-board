import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { api } from '../../../settings';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser, login, logoff } from '../../../redux/userRedux.js';

import styles from './Header.module.scss';

const Component = ({ className, user, login, logoff }) => {
  const authenticationHandler = (event) => {
    event.preventDefault();
    user.authenticated ? logoff(user) : login(user);
  };

  return (
    <div className={clsx(className, styles.root)}>
      {user.authenticated ? (
        <div>
          <Button component={Link} variant="contained" color="primary" to="/myAds">
            My ads
          </Button>
          <Button component={Link} className={styles.logout} variant="contained" color="primary" to="/" onClick={authenticationHandler}>
            Logout
          </Button>
        </div>
      ) : (
        <Button variant="contained" className={styles.button} href={`${api.imageUrl}auth/google`}>
          <AddIcon className={styles.icon} />
          Login with Google
        </Button>
      )}
      <Button component={Link} className={styles.goBack} variant="contained" color="primary" to="/">
        Go back to homepage
      </Button>
      {/* temporarily */}
      <Button variant="contained" color="primary" onClick={authenticationHandler}>
        Change user permissions
      </Button>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  login: PropTypes.func,
  logoff: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(login(payload)),
  logoff: (payload) => dispatch(logoff(payload)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
