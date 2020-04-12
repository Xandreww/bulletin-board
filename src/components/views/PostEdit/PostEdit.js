import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import datePicker from 'date-and-time';
import { NotFound } from '../NotFound/NotFound';
import { api } from '../../../settings';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getSinglePost, updatePostRequest } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux.js';

import styles from './PostEdit.module.scss';

class Component extends React.Component {
  state = {
    id: this.props.post._id,
    title: this.props.post.title,
    price: this.props.post.price,
    content: this.props.post.content,
    email: this.props.post.email,
    telephone: this.props.post.telephone,
    image: this.props.post.image,
    date: this.props.post.date,
    status: this.props.post.status,
    userId: this.props.user.id,
  };

  static propTypes = {
    className: PropTypes.string,
    user: PropTypes.object,
    post: PropTypes.object,
    editPost: PropTypes.func,
    updateDate: PropTypes.instanceOf(Date),
  };

  handleChange = ({ target }) => {
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
        this.setState({ file: target.value });
        break;
      }
      default:
        console.log('no switch type');
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const now = new Date();
    const generateDate = datePicker.format(now, 'DD.MM.YYYY');

    const post = { ...this.state, updateDate: generateDate };

    this.props.editPost(post.id, post);
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { className, user, post } = this.props;
    const { title, price, content, email, telephone } = this.state;

    const titleProps = {
      minLength: 10,
    };

    const contentProps = {
      minLength: 20,
    };

    return user.authenticated && (user.id === post.userId || user.admin) ? (
      <div className={clsx(className, styles.root)}>
        <form autoComplete="off" onSubmit={(event) => handleSubmit(event)}>
          <h2 className={styles.title}>Edit post</h2>
          <img src={`${api.imageUrl}${post.image}`} alt="post img" className={styles.image} />
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
          <label htmlFor="raised-button-file" className={styles.changePhoto}>
            <Button variant="contained" component="span">
              Change image
            </Button>
          </label>
          <Button type="submit" variant="contained" color="primary" className={styles.submit}>
            Submit
          </Button>
        </form>
      </div>
    ) : (
      <NotFound />
    );
  }
}

const mapStateToProps = (state, props) => ({
  user: getUser(state),
  post: getSinglePost(state, props.match.params.id),
});

const mapDispatchToProps = (dispatch) => ({
  editPost: (id, payload) => dispatch(updatePostRequest(id, payload)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
