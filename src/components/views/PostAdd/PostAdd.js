import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostAdd.module.scss';

const Component = ({ className, children }) => (
  <div className={clsx(className, styles.root)}>
    <h2>Add new post</h2>
    <form autoComplete="off">
      <TextField required id="title" label="title" />
      <TextField required id="price" label="price" type="number" />
      <TextField required id="content" label="content" multiline rows="10" variant="outlined" />
      <TextField required id="email" type="email" label="email" />
      <TextField required id="telephone" type="number" label="telephone number" />

      {/* use display: 'none' on input */}
      <input accept="image/*" id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      <Button variant="contained" color="primary">
        Submit
      </Button>
    </form>
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
  Component as PostAdd,
  // Container as PostAdd,
  Component as PostAddComponent,
};
