/* selectors */
export const getUser = ({ user }) => user;

/* action name creator */
const reducerName = 'user';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const AUTHENTICATE = createActionName('AUTHENTICATE');
const UNAUTHENTICATE = createActionName('UNAUTHENTICATE');

/* action creators */
export const authenticate = (payload) => ({ payload, type: AUTHENTICATE });
export const unauthenticate = (payload) => ({ payload, type: UNAUTHENTICATE });

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case AUTHENTICATE: {
      return {
        ...statePart,
        user: {
          authenticated: true,
        },
      };
    }
    case UNAUTHENTICATE: {
      return {
        ...statePart,
        user: {
          authenticated: false,
        },
      };
    }
    default:
      return statePart;
  }
};
