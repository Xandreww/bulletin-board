import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import { NotFound } from '../NotFound/NotFound';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getSinglePost, fetchAllPosts } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux';

import styles from './Post.module.scss';

class Component extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    post: PropTypes.object,
    user: PropTypes.object,
    fetchAllPosts: PropTypes.func,
    match: PropTypes.object,
  };

  componentDidMount() {
    const { fetchAllPosts } = this.props;
    fetchAllPosts();
  }

  render() {
    const { className, post, user } = this.props;

    return (
      <div className={clsx(className, styles.root)}>
        {user.authenticated || user.admin ? (
          <Card key={post._id}>
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
        ) : (
          <NotFound />
        )}
        {user.id === post.userId && (
          <Button component={Link} className={styles.editPostButton} variant="contained" color="primary" to={`/post/${post._id}/edit`}>
            <EditIcon />
            Edit post
          </Button>
        )}
      </div>
    );
  }
}

// const Component = ({ className, post, user }) => (
//   <div className={clsx(className, styles.root)}>
//     {user.authenticated || user.admin ? (
//       <Card key={post._id}>
//         {console.log('post:', post)}
//         <CardContent>
//           <div className={styles.dataAndStatus}>
//             <p>Latest update: {post.updatedDate ? post.updatedDate : post.date}</p>
//             <p>
//               Status: <span className={styles.status}>{post.status}</span>
//             </p>
//           </div>
//           <h2 className={styles.title}>{post.title}</h2>
//         </CardContent>
//         <CardMedia component="img" alt="Ad item" image={post.image} />
//         <CardContent>
//           <p>{post.text}</p>
//           <p>{`Price: $${post.price}`}</p>
//           <div>
//             <p>Contact seller:</p>
//             <p>{`email: ${post.email}`}</p>
//             {post.telephone && <p>{`phone: ${post.telephone}`}</p>}
//           </div>
//         </CardContent>
//       </Card>
//     ) : (
//       <NotFound />
//     )}
//     {user.id === post.userId && (
//       <Button component={Link} className={styles.editPostButton} variant="contained" color="primary" to={`/post/${post._id}/edit`}>
//         <EditIcon />
//         Edit post
//       </Button>
//     )}
//   </div>
// );

// Component.propTypes = {
//   className: PropTypes.string,
//   posts: PropTypes.array,
//   post: PropTypes.object,
//   user: PropTypes.object,
// };

const mapStateToProps = (state, props) => ({
  post: getSinglePost(state, props.match.params.id),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllPosts: () => dispatch(fetchAllPosts()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
