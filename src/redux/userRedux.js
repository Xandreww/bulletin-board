/* selectors */
export const getUser = ({ user }) => user;

/* action name creator */
// const reducerName = 'posts';
// const createActionName = (name) => `app/${reducerName}/${name}`;

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    default:
      return statePart;
  }
};
