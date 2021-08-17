
import { createAction, handleActions }  from "redux-actions";
/* == Library - jwt decode */
import jwtDecode                        from 'jwt-decode';
/* == Custom - shared > api / cookie */
import { userApi }                      from "../shared/api";
import { setCookie, deleteCookie }      from '../shared/cookie';

/* == User - initial state */
const initialState = {
  name: "",
  email: "",
  picture: "",
  isLoggedIn: false,
};

/* == action */
const LOGIN       = "user/LOGIN";
const LOGOUT      = "user/LOGOUT";
const SET_LOGIN   = 'user/SET_LOGIN';

/* == action creator */
const login       = createAction(LOGIN, ( user ) => ({ user }));
const logout      = createAction(LOGOUT, () => ({}));
const setLogin    = createAction(SET_LOGIN, () => ({}));

/* == thunk function */
const __login = 
  (authorization_code) =>
    async (dispatch, getState, { history }) => {
      try {
        const { data } = await userApi.login(authorization_code);
        const _token = JSON.stringify(data)
        const decoded = jwtDecode(_token);

        dispatch(login(decoded));
        localStorage.setItem("useremail", decoded.email);
        setCookie("TOKEN", _token, 10);     
        history.push("/");
      } catch (e) {
        console.log(e);
      }
    };

const __logout =
  () =>
  (dispatch, getState, { history }) => {
    try {
      localStorage.removeItem("useremail");
      deleteCookie("TOKEN");
			dispatch(logout());
		  history.push("/login");
    } catch (e) {
      console.log(e);
    }
  };

const __setLogin =
  () =>
  (dispatch, getState, { history }) => {
    const useremail = localStorage.getItem("useremail");
    const token = document.cookie.split(`"`)[3];		
    if (useremail !== null && token !== "") {
      dispatch(setLogin());
    }
  };

/* == reducer */
const user = handleActions(
  {
    [LOGIN]: (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
        name: action.payload.user.name,
        email: action.payload.user.email,
        picture: action.payload.user.picture,
      };
    },
    [LOGOUT]: (state, action) => {
      return {
        ...state,
        isLoggedIn: false,
      };
    },
    [SET_LOGIN]: (state, action) => {
			return {
				...state,
				isLoggedIn: true,
			};
    }
  },
  initialState,
);

/* == export actions */
export const userActions = {
  __login,
  __logout,
  __setLogin,
};

export default user;
