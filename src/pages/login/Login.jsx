import React                      from "react";
/* == Library - style */
import styled                     from "styled-components";
/* == Custom - Elements */
import KakaoButton                from "../../elements/KakaoButton";
/* == Custom - Icon */
import { ReactComponent as Logo } from "../../styles/images/logo.svg";
import { ReactComponent as Panda }from "../../styles/images/img-panda-login.svg";
/* == Custom - shared > OAuth setting */
import { dev_oauthURL, oauthURL } from "../../shared/oauthenv";
/* == Redux - actions */
import { useDispatch }            from "react-redux";

// * == ( Page > Login ) -------------------- * //
const Login = ({ history }) => {
  const dispatch = useDispatch();
  
  return (
    <Wrapper>
      <Container>
        <Logo style={{marginBottom: "2.75rem"}}/>
        <Panda style={{marginBottom: "2rem"}}/>
        <h3>안 그래도 복잡한데,</h3>
        <h3>일까지 복잡할 필요는 없잖아요</h3>
        <h1>협업의 시작, <span>PandaN</span>에서 판단!</h1>
        {/* 로컬 테스트 */}
        {/* <KakaoButton type="button" onClick={()=> { window.location.href = dev_oauthURL }}/> */}
        {/* 배포 */}
        <KakaoButton type="button" onClick={()=> { window.location.href = oauthURL }}/>
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
  background-color: rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  width : 45rem;
  padding: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  text-align: center;
  background-color: #fff;
  border-radius: 2.5rem;

  & h1 {
    margin-top: 1rem;
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 2rem;
    text-align: center;
    letter-spacing: -0.03rem;
    color: #9A9A9A;
    & span {
      color: #387E4B;
    }
  }
  & h3 {
    font-weight: bold;
    font-size: 1.25rem;
    line-height: 1.5rem;
    text-align: center;
    letter-spacing: -0.03rem;
    color: #9A9A9A;
    & span {
      color: #387E4B;
    }
  }

@media (max-width: 767px){
  width: inherit;
  height: inherit;
  min-width: 300px;
  border-radius: 0;
}

@media (max-width: 375px){
  & h1 {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
  & h3 {
    font-size: 1.0rem;
    line-height: 1.5rem;
  }
}
`;

export default Login;
