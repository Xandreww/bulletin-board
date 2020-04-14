import Axios from 'axios';
import { api } from '../settings';

/* selectors */
export const getAll = ({ posts }) => posts.data;
export const getSinglePost = ({ posts }, postId) => {
  const filtered = posts.data.filter((post) => post._id === postId);
  return filtered.length ? filtered[0] : { error: true };
};
export const getMyAds = ({ posts, user }) => {
  const filtered = posts.data.filter((post) => post.userId === user.id);
  return filtered;
};

/* thunk creators */
export const fetchAllPosts = () => {
  return (dispatch, getState) => {
    const { posts } = getState();

    if (posts.data.length === 0 && posts.loading.active === false) {
      dispatch(fetchStarted());

      Axios.get(`${api.url}/${api.fullPosts}`)
        .then((res) => {
          dispatch(fetchSuccess(res.data));
        })
        .catch((err) => {
          dispatch(fetchError(err.message || true));
        });
    }
  };
};

export const addPostRequest = (data) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios.post(`${api.url}/${api.posts}`, data, { headers: { 'Content-Type': 'application/json' } })
      .then((res) => {
        dispatch(addPost(res.data));
      })
      .catch((err) => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const updatePostRequest = (id, data) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios.put(`${api.url}/${api.posts}/${id}`, data, { headers: { 'Content-Type': 'application/json' } })
      .then((res) => {
        dispatch(editPost(res.data));
      })
      .catch((err) => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* action name creator */
const reducerName = 'posts';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

const ADD_POST = createActionName('ADD_POST');
const EDIT_POST = createActionName('EDIT_POST');

/* action creators */
export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });

export const addPost = (payload) => ({ payload, type: ADD_POST });
export const editPost = (payload) => ({ payload, type: EDIT_POST });

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_POST: {
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
        loading: {
          active: false,
          error: false,
        },
      };
    }
    case EDIT_POST: {
      return {
        ...statePart,
        data: statePart.data.map((post) => {
          return post._id === action.payload._id ? action.payload : post;
        }),
        loading: {
          active: false,
          error: false,
        },
      };
    }
    default:
      return statePart;
  }
};
