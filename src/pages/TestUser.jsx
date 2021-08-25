import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
/* == Redux - actions */
import { useSelector, useDispatch } from "react-redux";

/* == Axios - instance */
const instance = axios.create({
  baseURL: "http://blossomwhale.shop",
  headers: {},
});

/* == Axios - interceptor for sending accessToken */
instance.interceptors.request.use((config) => {
  const TOKEN = document.cookie.split("=")[1];
  config.headers.TOKEN = TOKEN;
  return config;
});

const __testJoinProject =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await instance.post("/api/test/invite");
      window.alert("프로젝트 진입 성공");
      history.push("/");
    } catch (e) {
      console.log("실행 실패");
      console.log(e);
    }
  };

const TestUser = ({ history }) => {
  const dispatch = useDispatch();
  const joinProject = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(__testJoinProject());
  };
  return (
    <div>
      <div>
        <h2>1. 테스트 유저로 로그인하기</h2>
        <h4>현재 api 없음</h4>
        <input type="text" />
        <input type="password" />
        <button type="button">로그인</button>
      </div>
      <div>
        <h2>2. 테스트 프로젝트로 들어가기</h2>
        <h4>한 번만 누르세요.</h4>
        <Button onClick={joinProject}>프로젝트 들어가기</Button>
      </div>
    </div>
  );
};

export default TestUser;
