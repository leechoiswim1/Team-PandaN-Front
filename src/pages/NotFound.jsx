import { logRoles } from "@testing-library/react";
import React from "react";
import styled from "styled-components";
import { history } from "../modules/configStore";
import favicon from "../styles/images/favicon.png";
import { ReactComponent as Logo } from "../styles/images/logo.svg";
import { ReactComponent as PandaNotFound } from "../styles/images/Panda_NotFound.svg";
import { ReactComponent as PageNotFound } from "../styles/images/Page_Not_Found.svg";
import { ReactComponent as WrongRequest } from "../styles/images/WrongRequest.svg";
import { ReactComponent as GoHome } from "../styles/images/Icon_NotFoundHome.svg";
const NotFound = () => {
  return (
    <>
      <Logo style={{ display: "block", margin: "auto" }} />
      <Container>
        <NotFoundBody>
          <PandaNotFound />
          <PageNotFound style={{ margin: "20px 0px" }} />
          <WrongRequest style={{ marginBottom: "30px" }} />

          <HomeBtn
            onClick={() => {
              history.push("/");
            }}
          >
            <GoHome width="22" style={{ marginRight: "18px" }} />
            메인으로 돌아가기
          </HomeBtn>
        </NotFoundBody>
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

const NotFoundBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HomeBtn = styled.div`
background: #e1ede4;
width: 329px;
height: 60px;
display: flex;
cursor: pointer;
border-radius: 10px;
margin: auto;
padding: auto;
justify-content: center;
align-items: center;
font-size: 20px;
line-height: 30px;
font-weight: bold;
&:hover {
  background: #ededed;
`;

export default NotFound;
