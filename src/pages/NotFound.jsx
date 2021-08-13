import { logRoles } from "@testing-library/react";
import React from "react";
import styled from "styled-components";
import { history } from "../modules/configStore";
import favicon from "../styles/images/favicon.png";
import { ReactComponent as Logo } from "../styles/images/logo.svg";
const NotFound = () => {
  return (
    <>
      <Logo style={{ display: "block", margin: "auto" }} />
      <Container>
        <div style={{ display: "block", margin: "0 auto", justifyContent: "center", alignItems: "center" }}>
          <NotFoundMain>
            O🐼
            <img src={favicon} alt="favicon" />
            s!
          </NotFoundMain>
          <NotFoundText>잘못된 접근입니다! </NotFoundText>

          <HomeBtn
            onClick={() => {
              history.push("/");
            }}
          >
            메인으로 돌아가기
          </HomeBtn>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const NotFoundMain = styled.p`
  text-align: center;
  font-size: 6rem;
  font-weight: 700;
`;

const NotFoundText = styled.p`
  margin-top: 30px;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
`;

const HomeBtn = styled.button`
  display: block;
  margin: 20px auto;
  font-size: 18px;
  font-weight: 500;
  font-color: #fff;
  cursor: pointer;
  justifycontent: center;
  alignitems: center;
  width: 200px;
  height: 40px;
  background: #e1ede4;
  border-radius: 15px;
`;

export default NotFound;
