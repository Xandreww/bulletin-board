import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { addPost } from '../../../redux/postsRedux.js';

import styles from './PostAdd.module.scss';

class Component extends React.Component {
  state = {
    title: '',
    price: '',
    content: '',
    email: '',
    telephone: '',
    image: undefined,
  };

  static propTypes = {
    className: PropTypes.string,
    addPost: PropTypes.func,
  };

  handleChange = ({ target }) => {
    console.log('target type:', target.type);
    console.log('target value:', target.value);
    console.log(this.state);
    switch (target.type) {
      case 'text': {
        this.setState({ title: target.value });
        break;
      }
      case 'number': {
        this.setState({ price: target.value });
        break;
      }
      case 'textarea': {
        this.setState({ content: target.value });
        break;
      }
      case 'email': {
        this.setState({ email: target.value });
        break;
      }
      case 'tel': {
        this.setState({ telephone: target.value });
        break;
      }
      case 'file': {
        this.setState({ telephone: target.value });
        break;
      }
      default:
        return console.log('no switch type');
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submit!', this.state);

    this.props.addPost(this.state);
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { className } = this.props;
    const { title, price, content, email, telephone, image } = this.state;

    return (
      <div className={clsx(className, styles.root)}>
        <form autoComplete="off" onSubmit={(event) => handleSubmit(event)}>
          <h2 className={styles.title}>Add new post</h2>
          <TextField className={styles.formField} required id="title" label="title" minLength="10" value={title} onChange={handleChange} />
          <TextField className={styles.formField} required id="price" label="price" type="number" value={price} onChange={handleChange} />
          <TextField
            className={styles.content}
            required
            id="content"
            label="content"
            multiline
            rows="10"
            variant="outlined"
            minLength="20"
            value={content}
            onChange={handleChange}
          />
          <TextField className={styles.formField} required id="email" type="email" label="email" value={email} onChange={handleChange} />
          <TextField
            className={styles.formField}
            required
            id="telephone"
            type="tel"
            label="telephone number"
            value={telephone}
            onChange={handleChange}
          />
          <input accept="image/*" id="icon-button-file" type="file" value={image} onChange={handleChange} />
          <label htmlFor="icon-button-file">
            <IconButton className={styles.addPhoto} color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPost: (payload) => dispatch(addPost(payload)),
});

const Container = connect(mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
