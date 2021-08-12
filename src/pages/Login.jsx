import React from "react";
import styled from "styled-components";
/* == Custom - Elements */
import GoogleButton from "../elements/GoogleButton";
/* == Custom - Icon */
import { ReactComponent as Logo } from "../styles/images/logo.svg";
/* == Redux - actions */
import { useDispatch }     from "react-redux";

const Login = ({ history }) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Container>
        <Logo />
        <p style={{fontSize: "80px"}}>🐼</p>
        <h3>세상에서 제일 쉬운 협업툴</h3>
        <h3><b>PandaN</b>을 만나보세요!</h3>        

        <form action="http://blossomwhale.shop/oauth2/authorization/google">
          <GoogleButton type="submit"/>
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
  background-color: rgba(0, 0, 0, 0.3);
`;

const Container = styled.div`
  padding: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  text-align: center;
  background-color: #fff;
  border-radius: 2.5rem;

@media (max-width: 767px){
  width: inherit;
  height: inherit;
  min-width: 360px;
  border-radius: 0;
}
`;

export default Login;
