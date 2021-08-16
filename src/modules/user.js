import { createAction, handleActions } from "redux-actions";
import { userApi } from "../shared/api";
import { setCookie, deleteCookie } from '../shared/cookie';
import jwt_decode from 'jwt-decode';

/*
 * 현재 jsessionid 쓰는 방식 mvp 배포 후 변경 예정 
 * 이후 로그인 / 클라이언트단 auth 관련 이슈 대응 가능
 */

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
  (dispatch, getState, { history }) => {
    try {
      // cors 해결 뒤 순서 바꿀 것, jwt 방식 전환하면 로직 전체 수정 
      deleteCookie("token");
      dispatch(logout());
      history.push("/login");      
      // await userApi.logout();
      userApi.logout();
      // localStorage.removeItem("userInfo");
    } catch (e) {
      console.log(e);
    }
  };

const __getUserDetail =
  () =>
  async (dispatch, getState, { history }) => {
    const isLoggedIn = getState().user.isLoggedIn;
    try {
      // jwt 방식 전환하면 로직 전체 수정 
      if (isLoggedIn) return;      
      const { data } = await userApi.getUserDetail();
			// localStorage.setItem("userInfo", decoded.sub);
      // const decoded = jwt_decode(data);
			setCookie("token", data.name, 1);
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
    // jwt 전환 전 작성, 로그인 방식 개편 후 전체 로직 수정 예정
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
