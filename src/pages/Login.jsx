import React from "react";
import styled from "styled-components";
/* elements */
import { Button } from "../elements";
import { useDispatch } from "react-redux";

const Login = ({ history }) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Container>
        <h1>PandaN</h1>
        <h1>🐼</h1>
        <h3>
          세상에서 제일 쉬운 협업툴 <br />
          PandaN을 만나보세요!
        </h3>
        <form action="http://blossomwhale.shop/oauth2/authorization/google">
          <GoogleBtn type="submit">구글 계정으로 로그인</GoogleBtn>
        </form>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  text-align: center;
`;

const GoogleBtn = styled(Button)`
  background-image: url();
`;
export default Login;
