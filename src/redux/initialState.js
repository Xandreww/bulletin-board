export const initialState = {
  posts: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
  },
  user: {
    id: '1',
    authenticated: true,
    admin: false,
  },
};
