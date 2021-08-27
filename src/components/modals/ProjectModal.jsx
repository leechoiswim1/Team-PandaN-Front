import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import ModalPortal from "../../util/ModalPotal";

import { actionCreators as projectActions } from "../../modules/project";
import { useDispatch } from "react-redux";
import { history } from "../../modules/configStore";
import { t } from "../../util/remConverter";
import { ReactComponent as IconProjectAdd } from "../../styles/images/ico-project-add.svg";
import { ReactComponent as Write } from "../../styles/images/ico-kanban-write.svg";
import { ReactComponent as IconAdd } from "../../styles/images/Icon_AddProject.svg";
import { ReactComponent as CloseModal } from "../../styles/images/Icon_ModalClose.svg";
import modalSideImage from "../../styles/images/modalSideImage.PNG";
const ProjectModal = (props) => {
  const dispatch = useDispatch();

  const [ProTitle, setProTitle] = useState("");
  const [ProDesc, setProDesc] = useState("");
  const [modalState, setModalState] = useState(false);

  const CreateProject = () => {
    if (ProTitle === "") {
      window.alert("프로젝트 이름을 입력해주세요!");
      return;
    }
    const project = {
      title: ProTitle,
      detail: ProDesc,
    };
    dispatch(projectActions.__postProject(project));
    setModalState(false);
    history.push("/");
  };

  const changeProTitle = (e) => {
    setProTitle(e.target.value);
  };

  const changeProDesc = (e) => {
    setProDesc(e.target.value);
  };

  const modalFalse = () => {
    if (!(ProTitle === "") || !(ProDesc === "")) {
      setModalState(true);
    } else {
      setModalState(false);
    }
  };

  return (
    <>
      {props.sidebar === "sidebar" ? (
        <>
          <IconProjectAdd
            width="40"
            height="40"
            style={{ cursor: "pointer" }}
            fill="#9A9A9A"
            className="menu-icon"
            onClick={() => setModalState(true)}
          />
          <span className="menu-text" style={{ cursor: "pointer" }} onClick={() => setModalState(true)}>
            프로젝트 만들기
          </span>
        </>
      ) : props.main === "main" ? (
        <Item2 onClick={() => setModalState(true)}>
          <IconAdd />
        </Item2>
      ) : (
        <EmptyProjectBtn onClick={() => setModalState(true)} className="btn-main">
          <Write fill="#000000" width="22" /> <EmptyProjectText>새 프로젝트 만들기</EmptyProjectText>
        </EmptyProjectBtn>
      )}
      <ModalPortal>
        {modalState ? (
          <Background>
            <Overlay onClick={modalFalse} />
            <Window>
              <ModalHead>
                <ModalHeadInner>
                  <IconProjectAdd width="25px" height="25px" fill="#000000" className="menu-icon" position="absolute" style={{ margin: "auto" }} />
                  <ModalTitle>프로젝트 생성하기</ModalTitle>
                </ModalHeadInner>

                <CloseModal width="15px" style={{ cursor: "pointer", marginRight: "20px" }} onClick={() => setModalState(false)} />
              </ModalHead>
              <ModalBody>
                {/* == left */}
                <ModalBodyLeft>
                  <ModalBodyLeftInner>
                    <P>프로젝트 이름</P>
                    <TextArea style={{ height: "7vh" }} type="text" placeholder="프로젝트 이름" onChange={changeProTitle} maxLength="30" />
                    <P>프로젝트 내용 (선택사항)</P>
                    <TextArea type="text" placeholder="프로젝트 내용" onChange={changeProDesc} maxLength="50" />
                    <TextDesc>팀원들이 작업환경에 대해 쉽게 알 수 있도록 작성해주세요.</TextDesc>
                  </ModalBodyLeftInner>
                </ModalBodyLeft>

                {/* == right */}
                <ModalBodyRight>
                  <ModalBodyRightInner>
                    <ModalBodyRightImage src={modalSideImage} alt="modalSideImage" />
                    <TextDesc>
                      협업을 하기 위해, 협업툴을 배우는 시간은 그만! 😂 <TextDesc></TextDesc>세상에서 제일 쉬운 협업툴 PandaN을 만나보세요!
                    </TextDesc>
                  </ModalBodyRightInner>
                </ModalBodyRight>
              </ModalBody>

              <ModalFooter
                onClick={() => {
                  CreateProject();
                }}
              >
                프로젝트 만들러 가기!
              </ModalFooter>
            </Window>
          </Background>
        ) : (
          ""
        )}
      </ModalPortal>
    </>
  );
};

const fadeIn = keyframes`
from {
  opacity:0; }
to{
    opaciry:1;
}
`;

const EmptyProjectBtn = styled.div`
  background: #DEE3C2;

  &:hover {
    background: #ADBE4F;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const EmptyProjectText = styled.p`
  font-size: 20px;
  line-height: 30px;
  font-weight: 700;
  color: #191919;
  text-align: center;
  margin-left: 10px;
  
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const Background = styled.div`
  position: fixed;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
`;
const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;
const Window = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 900px;
  height: 600px;
  background: #ffffff;
  border-radius: 20px;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  @media (max-width: 768px) {
    max-width: 600px;
    max-height: 480px;
  }
  @media (max-width: 450px) {
    width: 95%;
    max-height: 500px;
  }
`;

const ModalHead = styled.div`
  width: 92%;
  height: 20%;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;
const ModalHeadInner = styled.div`
  display: flex;
  margin: 0 20px;
`;

const ModalTitle = styled.p`
  font-weight: 700;
  color: #000000;
  font-size: 22px;
  line-height: 36px;
  margin: 0 0 0 10px;
`;

const ModalBody = styled.div`
  display: flex;
  height: 65%;
  width: 100%;
`;

const ModalBodyLeft = styled.div`
  margin: auto;
  height: 100%;
  width: 58%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ModalBodyLeftInner = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 80%;
  width: 78%;
  margin: auto;
  @media (max-width: 768px) {
    width: 90%;
    margin: auto;
  }
`;

const P = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: #387e4b;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const TextArea = styled.textarea`
  width: 400px;
  height: 10vh;
  margin: 10px 0;
  border: 1px solid #ededed;
  font-size: 18px;
  padding: 5px;
  font-color: #9a9a9a;
  border-radius: 7px;
  @media (max-width: 768px) {
    font-size: 15px;
    width: 100%;
  }
`;

const TextDesc = styled.p`
  color: #9a9a9a;
  font-size: 14px;
  font-weight: 400;
`;

const ModalBodyRight = styled.div`
  display: block;
  box-sizing: border-box;
  width: 42%;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ModalBodyRightInner = styled.div`
  width: 90%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid #ededed;
  align-items: center;
  padding: 30px 20px;
`;

const ModalBodyRightImage = styled.img`
  margin: 0 0 10px 0;
  border-radius: 10px;
`;

const ModalFooter = styled.div`
  box-sizing: border-box;
  height: 15%;
  background: #387e4b;
  display: flex;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin: auto;
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  justify-content: center;
  text-align: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: #e1ede4;
    color: #387e4b;
  }
`;

const Item2 = styled.div`
  min-width: 280px;
  width: 370px;
  height: 280px;
  margin: 10px;
  border-radius: 20px;
  align-content: space-between;
  box-shadow: 0px 0px 5px rgba(25, 25, 25, 0.2);

  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
  @media (max-width: 1360px) {
    width: 30%;
  }
  @media (max-width: 900px) {
    width: 50%;
  }
  @media (max-width: 768px) {
    width: 80%;
  }
  &:hover {
    background: #e1ede4;
  }
`;

export default ProjectModal;
