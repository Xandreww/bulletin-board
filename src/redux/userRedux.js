/* selectors */
export const getUser = ({ user }) => user;

/* action name creator */
const reducerName = 'user';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const LOGIN = createActionName('LOGIN');
const LOGOFF = createActionName('LOGOFF');

/* action creators */
export const login = (payload) => ({ payload, type: LOGIN });
export const logoff = (payload) => ({ payload, type: LOGOFF });

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...statePart,
        authenticated: true,
      };
    }
    case LOGOFF: {
      return {
        ...statePart,
        authenticated: false,
      };
    }
    default:
      return statePart;
  }
};
