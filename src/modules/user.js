
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
const setLogin    = createAction(SET_LOGIN, ( user ) => ({ user }));

/* == thunk function */
const __login = 
  (authorization_code) =>
    async (dispatch, getState, { history }) => {
      try {
        const { data } = await userApi.login(authorization_code);
        const str_data = JSON.stringify(data)
        const decoded = jwtDecode(str_data);  
        const tokenvalue = str_data.split(`"`)[3];
        const userInfo = {
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture,
        }
        const str_userInfo = JSON.stringify(userInfo);

        dispatch(login(decoded));
        localStorage.setItem("userInfo", str_userInfo);
        setCookie("TOKEN", tokenvalue, 1);
        history.push("/");
      } catch (e) {
        console.log(e);
      }
    };

const __logout =
  () =>
  (dispatch, getState, { history }) => {
    try {
      localStorage.removeItem("userInfo");
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
    const user = localStorage.getItem("userInfo");
    const token = document.cookie.split("=")[1];
    const json_user = JSON.parse(user);
    if (user !== null && token !== "") {
      dispatch(setLogin(json_user));
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
        name: action.payload.user.name,
        email: action.payload.user.email,
        picture: action.payload.user.picture,
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
