import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';

import styles from './Header.module.scss';

const Component = ({ className, user }) => (
  <div className={clsx(className, styles.root)}>
    {user.authenticated ? (
      <div>
        <Button variant="contained" color="primary" href="/">
          My ads
        </Button>
        <Button variant="contained" color="primary" href="/">
          Logout
        </Button>
      </div>
    ) : (
      <Button variant="contained" color="primary" href="https://google.com">
        Login with Google
      </Button>
    )}
    {/* temporarily */}
    <Button variant="contained" color="primary">
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

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
