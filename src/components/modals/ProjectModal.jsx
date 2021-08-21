import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ModalPortal from "../../util/ModalPotal";

import { actionCreators as projectActions } from "../../modules/project";
import { useDispatch } from "react-redux";
import { history } from "../../modules/configStore";
import { t } from "../../util/remConverter";
import { ReactComponent as IconProjectAdd } from "../../styles/images/ico-project-add.svg";
import { ReactComponent as Write } from "../../styles/images/ico-kanban-write.svg";
import { ReactComponent as IconAdd } from "../../styles/images/Icon_AddProject.svg";

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
        <EmptyProjectBtn onClick={() => setModalState(true)}>
          <Write fill="#000000" width="22" /> <EmptyProjectText>새 프로젝트 만들기</EmptyProjectText>
        </EmptyProjectBtn>
      )}
      <ModalPortal>
        {modalState ? (
          <Background>
            <Overlay onClick={() => setModalState(false)} />

            <Window>
              <ModalBody>
                {/* == left */}
                <ModalBodyLeft>
                  <div style={{ width: "100%", height: "100%" }}>
                    <ModalBodyHead>
                      <div style={{ display: "flex", height: "25px", margin: "0 20px" }}>
                        <IconProjectAdd cursor="pointer" width="25px" height="25px" fill="#000000" className="menu-icon" position="absolute" />
                        <ModalTitle>프로젝트 생성하기</ModalTitle>
                      </div>
                    </ModalBodyHead>
                    <ModalBodyInner>
                      <form>
                        <P>프로젝트 이름</P>
                        <Input type="text" placeholder="프로젝트 이름" onChange={changeProTitle} maxLength="30" />
                        <P>프로젝트 내용 (선택사항)</P>
                        <TextArea type="text" placeholder="프로젝트 내용" onChange={changeProDesc} maxLength="50" />
                        <TextDesc>팀원들이 작업환경에 대해 쉽게 알 수 있도록 작성해주세요.</TextDesc>
                      </form>
                    </ModalBodyInner>
                  </div>
                </ModalBodyLeft>

                {/* == right */}
                <ModalBodyRight>
                  <ModalBodyRightHead>
                    <CloseBtn onClick={() => setModalState(false)}>x</CloseBtn>
                  </ModalBodyRightHead>
                  <ModalBodyRightInner>
                    <ModalBodyRightImage src={modalSideImage} alt="modalSideImage" />
                    <TextDesc>
                      협업을 하기 위해, 협업툴을 배우는 시간은 그만! 😂 <TextDesc></TextDesc>세상에서 제일 쉬운 협업툴 PandaN을 만나보세요!
                    </TextDesc>
                  </ModalBodyRightInner>
                </ModalBodyRight>
              </ModalBody>

              <ModalFooter>
                <ModalFooterInner>
                  <MakeBtn
                    onClick={() => {
                      CreateProject();
                    }}
                  >
                    프로젝트 만들러 가기
                  </MakeBtn>
                </ModalFooterInner>
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
const EmptyProjectBtn = styled.div`
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
  &:hover {
    background: #ededed;
  }
  @media (max-width: 600px) {
    margin-bottom: 20px;
    width: 220px;
    height: 50px;
  }
`;

const EmptyProjectText = styled.p`
  font-size: 20px;
  line-height: 30px;
  font-weight: 700;
  color: #191919;
  text-align: center;
  margin-left: 20px;
  @media (max-width: 600px) {
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
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 500px;
  background: #ffffff;
  border-radius: 20px;

  @media (max-width: 767px) {
    max-width: 600px;
    max-height: 500px;
  }
  @media (max-width: 400px) {
    max-width: 350px;
    max-height: 500px;
  }
`;

const ModalBody = styled.div`
  display: flex;
  height: 80%;
`;

const ModalBodyLeft = styled.div`

  margin: auto;
  height: 100%;
  width: 55%
  @media (max-width: 400px) {
    width: 90%;

`;

const ModalBodyHead = styled.div(
  ...t`
  width: 100%;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #c6d2de;
  height:20%;
`,
);

const ModalBodyInner = styled.div(
  ...t`
  position: relative;
  box-sizing:border-box;
  width: 100%;
  padding: 0 50px;
  top: 7%;
  height:80%;
  justifyContent: center;
  alignItems:center;
  
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

const P = styled.p(
  ...t`
 
  font-size :20px;
  font-weight :700;
  color: #387E4B;
`,
);

const Input = styled.input(
  ...t`
  width: 100%;
  height: 5vh;
  border: 1px solid #EDEDED;
  margin:20px 0;
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

const TextDesc = styled.p(
  ...t`
  color: #9A9A9A; 
  font-size:15px;
  font-weight: 200;
  `,
);

const ModalBodyRight = styled.div(
  ...t`
  display:block; 
  box-sizing:border-box;
  width: 45% ;
  background: #E1EDE4;
  border-top-right-radius: 27px; 
  @media (max-width: 500px) {
  display :none;
  }


`,
);
const ModalBodyRightHead = styled.div`
  width: 100%;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  height: 25%;
`;

const CloseBtn = styled.button`
  position: absolute;
  padding: 20px;
  color: #9a9a9a;
  font-size: 20px;
  font-weight: 600;
  top: 0;
  right: 0;
`;

const ModalBodyRightInner = styled.div(
  ...t`
  width: 90%;
  display:block;
  justify-content: center;
  align-items:center;
  margin: 0 auto;
`,
);

const ModalBodyRightImage = styled.img`
  margin: 0 0 10px 0;
`;

const ModalFooter = styled.div(
  ...t`
  box-sizing: border-box;
  height:20%;
  border-top: 1px solid #c6d2de;
  display: flex;
  `,
);
const ModalFooterInner = styled.div`
  margin: auto;
  padding: auto;
`;
const MakeBtn = styled.button`
  margin: auto;
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
  @media (max-width: 720px) {
    width: 80%;
  }
  &:hover {
    background: #e1ede4;
  }
`;

export default ProjectModal;
