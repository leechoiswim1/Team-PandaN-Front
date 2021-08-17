import { createAction, handleActions } from "redux-actions";
/* == Library - jwt decode */
import jwtDecode from "jwt-decode";
/* == Custom - shared > api / cookie */
import { userApi } from "../shared/api";
import { setCookie, deleteCookie } from "../shared/cookie";

/* == User - initial state */
const initialState = {
  name: "",
  email: "",
  picture: "https://e7.pngegg.com/pngimages/287/501/png-clipart-giant-panda-emoji-coloring-book-drawing-sticker-emoji-child-face-thumbnail.png",
  isLoggedIn: false,
};

/* == action */
const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";
const SET_LOGIN = "user/SET_LOGIN";

/* == action creator */
const login       = createAction(LOGIN, ( user ) => ({ user }));
const logout      = createAction(LOGOUT, () => ({}));
const setLogin    = createAction(SET_LOGIN, ( user ) => ({ user }));

/* == thunk function */
const __login =
  (authorization_code) =>
    async (dispatch, getState, { history }) => {
      try {
        // 로그인 한 유저가 뒤로가기로 페이지 돌아간 다음 다시 동일한 인가코드를 보내지 않도록 처리
        const isLoggedIn = getState().user.isLoggedIn;
        if (isLoggedIn) {
          history.push("/");
          return;
        }

        // OAuth authorization_code 보내고 토큰 가져오기
        const { data } = await userApi.login(authorization_code);

        // str 변환 후 decode 
        const str_data = JSON.stringify(data);
        const decoded = jwtDecode(str_data);
        
        // {"token":"...tokenvalue"} 토큰 값 가져오기 
        const tokenvalue = str_data.split(`"`)[3];

        // 유저 정보 유지를 위해 str 변환
        const userInfo = {
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture,
        };
        const str_userInfo = JSON.stringify(userInfo);
        
        dispatch(login(decoded));

        // str 변환한 유저정보 localStorage 저장   
        localStorage.setItem("userInfo", str_userInfo);
        
        // setCookie("TOKEN", 값, 유효기간) 
        setCookie("TOKEN", tokenvalue, 1);           
        
        // 메인페이지 이동
        history.push("/");
        
      } catch (e) {
        console.log(e);
        window.alert("로그인에 실패하였습니다. 다시 로그인 해 주세요.")
        history.push("/login");
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
