import React                      from "react";
/* == Library - style */
import styled                     from "styled-components";
import { t }                      from "../../util/remConverter";
/* == Custom - Elements */
import KakaoButton                from "../../elements/KakaoButton";
/* == Custom - Icon */
import { ReactComponent as Panda }from "../../styles/images/img-panda-login.svg";
import { ReactComponent as Logo }from "../../styles/images/img-logo-login.svg";
import { ReactComponent as Slogan }from "../../styles/images/img-slogan-login.svg";
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
        <Panda style={{marginBottom: "1.5rem"}}/>
        <Slogan style={{marginBottom: "1.25rem"}}/>
        <h1>세상에서 제일 쉬운 협업툴</h1>
        <h1><span>PandaN</span>을 만나보세요</h1>
        {/* 로컬 테스트 */}
        <KakaoButton type="button" onClick={()=> { window.location.href = dev_oauthURL }}/>
        {/* 배포 */}
        {/* <KakaoButton type="button" onClick={()=> { window.location.href = oauthURL }}/> */}
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

const Container = styled.div(...t`
  /* width : 46.5rem; */
  width: 744px;
  /* height : 39.75rem; */
  height : 636px;
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
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
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
`);

export default Login;
