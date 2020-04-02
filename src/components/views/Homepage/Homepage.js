import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Homepage.module.scss';

const Component = ({ className, children }) => (
  <div className={clsx(className, styles.root)}>
    {/* for logged in*/}
    <Button variant="contained" color="primary" href="/post/add">
      Add new
    </Button>
    {/* for all*/}
    <div>List of adds.....</div>
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
  Component as Homepage,
  // Container as Homepage,
  Component as HomepageComponent,
};
