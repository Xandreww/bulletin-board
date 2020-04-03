import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux.js';

import styles from './Homepage.module.scss';

const Component = ({ className, posts }) => (
  <div className={clsx(className, styles.root)}>
    {/* for logged in*/}
    <Button variant="contained" color="primary" href="/post/add">
      Add new
    </Button>
    {/* for all*/}
    <div>
      {posts.map(post => (
        <Card key={post.id} variant="outlined">
          <CardActionArea href={`/post/${post.id}`}>
            <CardMedia component="img" alt="Ad item" image={post.image} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {post.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {post.text}
              </Typography>
              <Typography variant="body1" color="textPrimary" component="p">
                {`price: $${post.price}`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  posts: PropTypes.array,
};

const mapStateToProps = state => ({
  posts: getAll(state),
});

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
