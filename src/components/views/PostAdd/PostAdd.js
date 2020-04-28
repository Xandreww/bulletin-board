import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { NotFound } from '../NotFound/NotFound';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { addPostRequest } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux.js';

import styles from './PostAdd.module.scss';

class Component extends React.Component {
  state = {
    post: {
      title: '',
      price: '',
      content: '',
      email: '',
      telephone: '',
      image: null,
      userId: this.props.user.id,
    },
    imagePreview: null,
  };

  static propTypes = {
    className: PropTypes.string,
    addPost: PropTypes.func,
    user: PropTypes.object,
    getCurrentDate: PropTypes.func,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { post } = this.state;

    const formData = new FormData();

    for (let key of ['title', 'price', 'content', 'email', 'telephone']) {
      formData.append(key, post[key]);
    }

    formData.append('image', post.image);
    formData.append('userId', post.userId);

    // Display the key/value pairs for formData
    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    this.props.addPost(formData);
  };

  handleChange = ({ target }) => {
    const { post } = this.state;
    const { value } = target;

    switch (target.type) {
      case 'text': {
        this.setState({ post: { ...post, title: value } });
        break;
      }
      case 'number': {
        this.setState({ post: { ...post, price: value } });
        break;
      }
      case 'textarea': {
        this.setState({ post: { ...post, content: value } });
        break;
      }
      case 'email': {
        this.setState({ post: { ...post, email: value } });
        break;
      }
      case 'tel': {
        this.setState({ post: { ...post, telephone: value } });
        break;
      }
      case 'file': {
        this.setState({ post: { ...post, image: target.files[0] }, imagePreview: URL.createObjectURL(target.files[0]) });
        break;
      }
      default:
        console.log('no switch type');
    }
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { className, user } = this.props;
    const { title, price, content, email, telephone, imagePreview } = this.state;

    const titleProps = {
      minLength: 10,
    };

    const contentProps = {
      minLength: 20,
    };

    return user.authenticated ? (
      <div className={clsx(className, styles.root)}>
        {imagePreview && <img src={imagePreview} alt="post img" className={styles.preview} />}
        <form autoComplete="off" onSubmit={(event) => handleSubmit(event)}>
          <h2 className={styles.title}>Add new post</h2>
          <TextField
            className={styles.formField}
            required
            id="title"
            label="title"
            inputProps={titleProps}
            value={title}
            onChange={handleChange}
          />
          <TextField className={styles.formField} required id="price" label="price" type="number" value={price} onChange={handleChange} />
          <TextField
            className={styles.content}
            required
            id="content"
            label="content"
            multiline
            rows="10"
            variant="outlined"
            inputProps={contentProps}
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

          <input accept="image/*" className={styles.input} id="raised-button-file" multiple type="file" onChange={handleChange} />
          <label htmlFor="raised-button-file" className={styles.addPhoto}>
            <Button variant="contained" component="span">
              <PhotoCamera />
              Add image
            </Button>
          </label>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </div>
    ) : (
      <NotFound />
    );
  }
}

const mapStateToProps = (state) => ({
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  addPost: (payload) => dispatch(addPostRequest(payload)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
