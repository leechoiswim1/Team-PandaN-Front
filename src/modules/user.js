/**
 * --------------------------------------------------------------------------
 * Redux Module: user.js
  * 기능 (로그인)
    * [로그인] - 서비스 접근을 위해 OAuth 인가코드를 서버로 보내 사용자 인증을 받으며 
    *           jwt token을 응답으로 받음
    * 
    * [로그아웃] - 로그인 상태에서 서비스 이용을 종료하며, 
    *            쿠키에 저장된 토큰과 로컬스토리지에 저장된 사용자 정보를 삭제함
    * 
    * [로그인 유지] - 새로고침시 사용자의 로그인 여부를 체크하여 
    *               로그인 한 사용자의 경우 로그인 상태 유지
 * --------------------------------------------------------------------------
 */

/**
 * --------------------------------------------------------------------------
 * import
    * [Library] redux-actions
    * [Library] jwt-decode: jwt 토큰 복호화
    * [Custom] api: axios instance 및 api 요청 함수
    * [Custom] cookie: 쿠키 저장 및 삭제 함수
 * --------------------------------------------------------------------------
 */

import { createAction, handleActions }  from "redux-actions";
import jwtDecode                        from "jwt-decode";
import { userApi }                      from "../shared/api";
import { setCookie, deleteCookie }      from "../shared/cookie";

/**
 * --------------------------------------------------------------------------
 * initial state
 * --------------------------------------------------------------------------
 */

const initialState = {
  name: "",
  email: "",
  picture: "",
  isLoggedIn: false,
};

/**
 * --------------------------------------------------------------------------
 * action
 * --------------------------------------------------------------------------
 */

const LOGIN     = "user/LOGIN";
const LOGOUT    = "user/LOGOUT";
const SET_LOGIN = "user/SET_LOGIN";

/**
 * --------------------------------------------------------------------------
 * action creator
 * --------------------------------------------------------------------------
 */

const login     = createAction(LOGIN, (user) => ({ user }));
const logout    = createAction(LOGOUT, () => ({}));
const setLogin  = createAction(SET_LOGIN, (user) => ({ user }));


/**
 * --------------------------------------------------------------------------
 * middleware thunk function
 * --------------------------------------------------------------------------
 */

/**
 * __login()
    * OAuth 인가코드 서버로 보내고, 응답으로 jwt 받음
    * 토큰은 cookie에 저장, 복호화 한 후 사용자 정보는 localStorage 저장
    * 사용자 정보 리듀서로 보낸 후 메인 페이지로 이동
 * @param {string} authorization_code : 로그인 시 리다이렉트된 페이지에서 받은 인가 코드
 */
const __login =
  (authorization_code) =>
  async (dispatch, getState, { history }) => {
    try {
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
      
      // setCookie("TOKEN", 값, 유효시간 = 6시간) 
      setCookie("TOKEN", tokenvalue, 6);           
      
      // 메인페이지 이동
      history.push("/");
      
    } catch (e) {
      console.log(e);
      window.alert("로그인에 실패하였습니다. 다시 로그인 해 주세요.")
      history.push("/login");
    }
  };

/**
 * __logout
    * localStorage / cookie 에 저장된 정보 및 토큰 삭제
    * 사용자 로그아웃 처리 리듀서로 보낸 후 로그인 페이지로 이동
 */

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

/**
 * __setLogin
    * localStorage / cookie 에 저장된 정보 및 토큰 있는지 확인
    * 둘 다 있을 경우 사용자 정보 리듀서로 보내 로그인 유지
    * router path 있는 모든 페이지 내에서 새로고침 시에도 로그인 정보 store 상에서 유지 목적 
 */

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

/**
 * --------------------------------------------------------------------------
 * reducer
 * --------------------------------------------------------------------------
 */

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
    },
  },
  initialState,
);

/**
 * --------------------------------------------------------------------------
 * export actions
 * --------------------------------------------------------------------------
 */

export const userActions = {
  __login,
  __logout,
  __setLogin,
};

export default user;
