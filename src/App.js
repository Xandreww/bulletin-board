import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { connect } from 'react-redux';
import { getAll, fetchAllPosts } from './redux/postsRedux';
import PropTypes from 'prop-types';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { MyAds } from './components/views/MyAds/MyAds';
import { Post } from './components/views/Post/Post';
import { PostEdit } from './components/views/PostEdit/PostEdit';
import { PostAdd } from './components/views/PostAdd/PostAdd';
import { NotFound } from './components/views/NotFound/NotFound';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2B4C6F' },
  },
});

class Component extends React.Component {
  static propTypes = {
    posts: PropTypes.array,
    fetchAllPosts: PropTypes.func,
  };

  componentDidMount() {
    const { fetchAllPosts } = this.props;
    fetchAllPosts();
  }

  render() {
    return (
      <BrowserRouter>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainLayout>
              <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/myAds" component={MyAds} />
                <Route exact path="/post/add" component={PostAdd} />
                <Route exact path="/post/:id" component={Post} />
                <Route exact path="/post/:id/edit" component={PostEdit} />
                <Route path="*" component={NotFound} />
              </Switch>
            </MainLayout>
          </ThemeProvider>
        </StylesProvider>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: getAll(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllPosts: () => dispatch(fetchAllPosts()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export { Container as App };
