import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, getSinglePost } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux';

import styles from './Post.module.scss';

const Component = ({ className, post, user }) => (
  <div className={clsx(className, styles.root)}>
    <Card key={post.id}>
      <CardContent>
        <div className={styles.dataAndStatus}>
          <p>Latest update: {post.updatedDate ? post.updatedDate : post.date}</p>
          <p>
            Status: <span className={styles.status}>{post.status}</span>
          </p>
        </div>
        <h2 className={styles.title}>{post.title}</h2>
      </CardContent>
      <CardMedia component="img" alt="Ad item" image={post.image} />
      <CardContent>
        <p>{post.text}</p>
        <p>{`Price: $${post.price}`}</p>
        <div>
          <p>Contact seller:</p>
          <p>{`email: ${post.email}`}</p>
          {post.telephone && <p>{`phone: ${post.telephone}`}</p>}
        </div>
      </CardContent>
    </Card>
    {(user.id === post.userId || user.admin) && (
      <Button component={Link} className={styles.editPostButton} variant="contained" color="primary" to={`/post/${post.id}/edit`}>
        <EditIcon />
        Edit post
      </Button>
    )}
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  posts: PropTypes.array,
  post: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  posts: getAll(state),
  post: getSinglePost(state, props.match.params.id),
  user: getUser(state),
});

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
