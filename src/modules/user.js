import { createAction, handleActions } from "redux-actions";
import { userApi } from "../shared/api";
import { setCookie, deleteCookie } from '../shared/cookie';
import jwt_decode from 'jwt-decode';

/* == User - initial state */
const initialState = {
  name: "",
  email: "",
  picture: "",
  isLoggedIn: false,
};

/* == action */
const LOGOUT = "user/LOGOUT";
const GET_USER_DETAIL = "user/GET_USER_DETAIL";
const SET_LOGIN = 'user/SET_LOGIN';

/* == action creator */
const logout = createAction(LOGOUT, () => ({}));
const getUserDetail = createAction(GET_USER_DETAIL, (user) => ({ user }));
const setLogin = createAction(SET_LOGIN, () => ({}));

/* == thunk function */
const __logout =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      // cors 해결 뒤 순서 바꿀 것
      deleteCookie("token");
      history.push("/login");
      await userApi.logout();
      // localStorage.removeItem("userInfo");
      dispatch(logout());
    } catch (e) {
      console.log(e);
    }
  };

const __getUserDetail =
  () =>
  async (dispatch, getState, { history }) => {
    const isLoggedIn = getState().user.isLoggedIn;
    try {
      if (isLoggedIn) return;
      const { data } = await userApi.getUserDetail();
			// const decoded = jwt_decode(data);
			// localStorage.setItem("userInfo", decoded.sub);
			setCookie("token", data, 1);
			history.push("/");
      dispatch(getUserDetail(data));
    } catch (e) {
      console.log(e);
    }
  };

const __setLogin =
  () =>
  (dispatch, getState, { history }) => {
    const userInfo = localStorage.getItem("userInfo");
    const token = document.cookie;
    if (userInfo !== null && token !== "") {
      dispatch(setLogin());
    }
  };

/* == reducer */
const user = handleActions(
  {
    [LOGOUT]: (state, action) => {
      return {
        ...state,
        isLoggedIn: false,
      };
    },
    [GET_USER_DETAIL]: (state, action) => {
      return {
        ...state,
        name: action.payload.user.name,
        email: action.payload.user.email,
        picture: action.payload.user.picture,
        isLoggedIn: true,
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
  __logout,
  __getUserDetail,
  __setLogin,
};

export default user;
