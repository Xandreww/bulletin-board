import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux.js';

import styles from './Post.module.scss';

const Component = ({ className, posts, match }) => (
  <div className={clsx(className, styles.root)}>
    <div>
      <Card key={posts[match.params.id - 1].id}>
        <CardContent>
          <div className={styles.dataAndStatus}>
            <p>
              Latest update:{' '}
              {posts[match.params.id - 1].updatedDate ? posts[match.params.id - 1].updatedDate : posts[match.params.id - 1].date}
            </p>
            <p>
              Status: <span className={styles.status}>{posts[match.params.id - 1].status}</span>
            </p>
          </div>
          <h2 className={styles.title}>{posts[match.params.id - 1].title}</h2>
        </CardContent>
        <CardMedia component="img" alt="Ad item" image={posts[match.params.id - 1].image} />
        <CardContent>
          <p>{posts[match.params.id - 1].text}</p>
          <p>{`Price: $${posts[match.params.id - 1].price}`}</p>
          <div>
            <p>Contact seller:</p>
            <p>{`email: ${posts[match.params.id - 1].email}`}</p>
            {posts[match.params.id - 1].telephone && <p>{`phone: ${posts[match.params.id - 1].telephone}`}</p>}
          </div>
        </CardContent>
      </Card>
      <Button className={styles.goBack} variant="contained" color="primary" href="/">
        Go back to homepage
      </Button>
    </div>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  posts: PropTypes.array,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

const mapStateToProps = state => ({
  posts: getAll(state),
});

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
