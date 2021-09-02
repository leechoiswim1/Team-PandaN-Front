import React from "react";
/* == Library - style */
import styled from "styled-components";

/* == Custom - Icon */
import PandaNotFound from "../styles/images/Panda_NotFound.svg";
import PageNotFound from "../styles/images/Page_Not_Found.svg";
import WrongRequest from "../styles/images/WrongRequest.svg";
import { ReactComponent as GoHome } from "../styles/images/Icon_NotFoundHome.svg";

/* == Redux  */
import { history } from "../modules/configStore";

const NotFound = () => {
  return (
    <>
      <Container>
        <NotFoundBody>
          <img src={PandaNotFound} alt={PandaNotFound} />
          <img src={PageNotFound} style={{ margin: "20px 0px" }} alt={PageNotFound} />
          <img src={WrongRequest} style={{ marginBottom: "30px" }} alt={WrongRequest} />
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
  @media (max-width: 600px) {
    width: 70%;
    height: 70%;
    margin: auto;
  }
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
  }
  @media (max-width: 600px) {
    width: 90%;
    width: 90%;
    font-size: 18px;
    margin: 10px;
  }
`;

export default NotFound;
