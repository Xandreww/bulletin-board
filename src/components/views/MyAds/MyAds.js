import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getMyAds } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux';

import styles from './MyAds.module.scss';

const Component = ({ className, posts, user }) => (
  <div className={clsx(className, styles.root)}>
    {user.authenticated && (
      <Button component={Link} className={styles.addNew} variant="contained" color="primary" to="/post/add">
        <AddIcon />
        Add new
      </Button>
    )}
    <div className={styles.cards}>
      {posts.map((post) => (
        <Card className={styles.card} key={post.id} variant="outlined">
          <CardActionArea component={Link} to={`/post/${post.id}`}>
            <CardMedia className={styles.cardMedia} component="img" alt="Ad item" image={post.image} />
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
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  posts: getMyAds(state),
  user: getUser(state),
});

const Container = connect(mapStateToProps)(Component);

export {
  // Component as MyAds,
  Container as MyAds,
  Component as MyAdsComponent,
};
