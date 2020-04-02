import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

const Component = ({ className, children }) => (
  <div className={clsx(className, styles.root)}>
    {/* for not logged in */}
    <Button variant="contained" color="primary" href="https://google.com">
      Login with Google
    </Button>
    {/* for logged in */}
    <Button variant="contained" color="primary" href="/">
      Logout
    </Button>
    {/* temporarily */}
    <Button variant="contained" color="primary">
      Change user permissions
    </Button>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
