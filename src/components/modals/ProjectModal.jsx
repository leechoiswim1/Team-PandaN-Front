import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ModalPortal from "../../util/ModalPotal";

import { actionCreators as projectActions } from "../../modules/project";
import { useDispatch } from "react-redux";

import { t } from "../../util/remConverter";
import { ReactComponent as IconProjectAdd } from "../../styles/images/ico-project-add.svg";
import modalSideImage from "../../styles/images/modalSideImage.PNG";

const ProjectModal = () => {
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
  };

  const changeProTitle = (e) => {
    setProTitle(e.target.value);
  };

  const changeProDesc = (e) => {
    setProDesc(e.target.value);
  };

  return (
    <>
      <IconProjectAdd width="40" height="40" fill="#9A9A9A" className="menu-icon" onClick={() => setModalState(true)} />
      <span className="menu-text" onClick={() => setModalState(true)}>
        프로젝트 만들기
      </span>
      <ModalPortal>
        {modalState ? (
          <Background>
            <Overlay onClick={() => setModalState(false)} />

            <Window>
              <div style={{ display: "flex", height: "80%" }}>
                {/* == left */}
                <div style={{ display: "fixed", width: "55%" }}>
                  <ModalHead>
                    <div style={{ display: "flex", height: "25px", margin: "0 20px" }}>
                      <IconProjectAdd cursor="pointer" width="25px" height="25px" fill="#000000" className="menu-icon" position="absolute" />
                      <ModalTitle>프로젝트 생성하기</ModalTitle>
                    </div>
                  </ModalHead>
                  <ModalBody>
                    <ModalBodyInner>
                      <form>
                        <P>프로젝트 이름</P>
                        <Input type="text" placeholder="프로젝트 이름" onChange={changeProTitle} maxLength="30" />
                        <P>프로젝트 내용 (선택사항)</P>
                        <TextArea type="text" placeholder="프로젝트 내용" onChange={changeProDesc} maxLength="50" />
                        <TextDesc>팀원들이 작업환경에 대해 쉽게 알 수 있도록 작성해주세요.</TextDesc>
                      </form>
                    </ModalBodyInner>
                  </ModalBody>
                </div>
                {/* == right */}
                <div style={{ display: "fixed", width: "45%", background: "#E1EDE4" }}>
                  <div
                    style={{
                      width: "70%",
                      justifyContent: "center",
                      alignItems: "center",
                      left: "50%",
                      top: "50%",
                      transform: "translate(20%, 50%)",
                    }}
                  >
                    <img src={modalSideImage} alt="modalSideImage" style={{ margin: "0 0 10px 0" }} />
                    <TextDesc>협업을 하기 위해, 협업툴을 배우는 시간은 그만! 😂 세상에서 제일 쉬운 협업툴 PandaN을 만나보세요!</TextDesc>
                  </div>
                </div>
              </div>
              <ModalFooter>
                <MakeP
                  onClick={() => {
                    CreateProject();
                  }}
                >
                  프로젝트 만들러 가기
                </MakeP>
              </ModalFooter>
            </Window>
          </Background>
        ) : (
          ""
        )}{" "}
      </ModalPortal>
    </>
  );
};

const Background = styled.div`
  position: fixed;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;
const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
`;
const Window = styled.div`
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 70%;
  background: #ffffff;
  border-radius: 20px;
  @media (max-width: 900px) {
    width: 65%;
    height: 70%;
  }
  @media (max-width: 400px) {
    width: 90%;
    height: 60%;
  }
`;
const P = styled.p(
  ...t`
  margin-top:10px;
  margin-bottom:10px;
  font-size :20px;
  font-weight :700;
  color: #387E4B;
`,
);

const MakeP = styled.p(
  ...t`
  margin:auto;
  padding-top: 20px;
  color: #767676;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  text-align: center;
`,
);

const Input = styled.input(
  ...t`
  width: 100%;
  height: 5vh;
  border: 1px solid #EDEDED;
  margin:10px 0;
  font-size: 18px;
  padding: 5px;
  font-color: #9A9A9A;
  border-radius: 7px;
`,
);

const TextArea = styled.textarea(
  ...t`
  width: 100%;
  height: 10vh;
  margin: 10px 0;
  border: 1px solid #EDEDED;
  font-size: 18px;
  padding: 5px;
  font-color: #9A9A9A;
  border-radius: 7px;
`,
);

const ModalTitle = styled.p(
  ...t`
  font-weight: 700; 
  color: #000000;
  font-size:20px;
  margin:0 0 0 5px;
  `,
);
const ModalHead = styled.div(
  ...t`
  
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #c6d2de;
  height:15%;
`,
);
const ModalBody = styled.div(
  ...t`
  margin:auto;
  height:70%;
  padding:auto;
  @media (max-width: 400px) {
    width: 90%;
    height: 50%;
  }
  
`,
);

const ModalFooter = styled.div(
  ...t`
  box-sizing: border-box;
  height:20%;
  border-top: 1px solid #c6d2de;
  `,
);

const ModalBodyInner = styled.div(
  ...t`
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding:0 20px;
  `,
);

const TextDesc = styled.p(
  ...t`
  color: #9A9A9A; 
  font-size:5px;
  font-weight: 200;
  `,
);

export default ProjectModal;
