import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux.js';

import styles from './Post.module.scss';

const Component = ({ className, posts, match }) => (
  <div className={clsx(className, styles.root)}>
    {/* for logged in*/}
    <Button variant="contained" color="primary" href="/post/add">
      Add new
    </Button>
    {/* for all*/}
    <div>
      <Card key={posts[match.params.id - 1].id} variant="outlined">
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={posts[match.params.id - 1].image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {posts[match.params.id - 1].title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {posts[match.params.id - 1].text}
            </Typography>
            <Typography variant="body1" color="textPrimary" component="p">
              {`price: $${posts[match.params.id - 1].price}`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" href={`/post/${posts[match.params.id - 1].id}`}>
            Details
          </Button>
        </CardActions>
      </Card>
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
