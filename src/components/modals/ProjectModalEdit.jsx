import React, { useState } from "react";
import ModalPortal from "../../util/ModalPotal";

/* == Library */
import styled, { keyframes } from "styled-components";

/* == Custom - Component */
import { actionCreators as projectActions } from "../../modules/project";

import { useDispatch } from "react-redux";
import { history } from "../../modules/configStore";

/* == Custom - Icon */
import { ReactComponent as IconProjectEdit } from "../../styles/images/icon-project-edit.svg";
import { ReactComponent as IconEdit } from "../../styles/images/icon-comment-edit.svg";
import { ReactComponent as CloseModal } from "../../styles/images/Icon_ModalClose.svg";
import modalSideImage from "../../styles/images/modalSideImage.PNG";

const ProjectModalEdit = (props) => {
  const dispatch = useDispatch();

  const id = props.projectId;
  const title = props.title;
  const detail = props.detail;

  const [ProTitle, setProTitle] = useState(title);
  const [ProDesc, setProDesc] = useState(detail);
  const [modalState, setModalState] = useState(false);

  const deleteProject = () => {
    if (window.confirm("정말로 프로젝트를 지우시겠습니까?😲") === true) {
      dispatch(projectActions.__deleteProject(id));
      setModalState(false);
      history.push("/");
    } else {
      return;
    }
  };

  const editProject = () => {
    if (ProTitle === "") {
      window.alert("프로젝트 이름을 입력해주세요!");
      return;
    }
    const project = {
      title: ProTitle,
      detail: ProDesc,
    };
    dispatch(projectActions.__editProject(id, project));
    setTimeout(() => {
      dispatch(projectActions.__setProject());
    }, 100);
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
      {props.main ? (
        <IconEdit style={{ cursor: "pointer" }} onClick={() => setModalState(true)} />
      ) : (
        <IconProjectEditCss fill="#9A9A9A" onClick={() => setModalState(true)} />
      )}

      <ModalPortal>
        {modalState ? (
          <Background>
            <Overlay onClick={() => setModalState(false)} />
            <Window>
              <ModalHead>
                <ModalHeadInner>
                  <IconProjectEdit fill="#000000" style={{ width: "25px", height: "25px", marginTop: "5px" }} className="menu-icon" />
                  <ModalTitle>프로젝트 수정하기</ModalTitle>
                </ModalHeadInner>
                <CloseModal width="15px" style={{ cursor: "pointer" }} onClick={() => setModalState(false)} />
              </ModalHead>
              <ModalBody>
                {/* == left */}
                <ModalBodyLeft>
                  <ModalBodyLeftInner>
                    <P>프로젝트 이름</P>
                    <TextArea
                      style={{ height: "7vh" }}
                      type="text"
                      placeholder="프로젝트 제목"
                      onChange={changeProTitle}
                      defaultValue={title}
                      maxLength="30"
                    />
                    <P>프로젝트 내용 (선택사항)</P>

                    <TextArea type="text" placeholder="프로젝트 내용" onChange={changeProDesc} defaultValue={detail} maxLength="50" />
                    <TextDesc>팀원들이 작업환경에 대해 쉽게 알 수 있도록 수정해주세요.</TextDesc>
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

              <ModalFooter>
                <ModalEditBtn
                  onClick={() => {
                    editProject();
                  }}
                >
                  수정
                </ModalEditBtn>

                <ModalDeleteBtn
                  onClick={() => {
                    deleteProject();
                  }}
                >
                  삭제
                </ModalDeleteBtn>
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

const IconProjectEditCss = styled(IconProjectEdit)`
cursor: pointer; 
width: 22px; 
height: 22px; 
margin-top: 2px;
&:hover {
  fill:#387E4B;
  animation: spin 7s linear infinite;
    animation-delay: 0;
    @keyframes spin {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}

`;

const fadeIn = keyframes`
from {
  opacity:0; }
to{
    opaciry:1;
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
    max-width: 720px;
    max-height: 500px;
  }
  @media (max-width: 400px) {
    max-width: 350px;
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
  margin: 0px 20px;
  @media (max-width: 400px) {
    width: 80%;
    justify-content: space-between;
  }
`;
const ModalHeadInner = styled.div`
  display: flex;
  margin: 0 20px;
  line-height: 36px;
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
`;

const ModalBodyLeft = styled.div`
  margin: auto;
  height: 100%;
  width: 60%
  @media (max-width: 400px) {
    width: 90%;
`;

const ModalBodyLeftInner = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 80%;
  width: 100%;
`;

const P = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: #387e4b;
  @media (max-width: 400px) {
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
  @media (max-width: 400px) {
    width: 340px;
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
  width: 40%;
  border-left: 1px solid #ededed;
  @media (max-width: 500px) {
    display: none;
  }
`;

const ModalBodyRightInner = styled.div`
  width: 85%;
  height: 50%;
  display: block;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
`;

const ModalBodyRightImage = styled.img`
  margin: 0 0 10px 0;
  border-radius: 10px;
`;

const ModalFooter = styled.div`
  box-sizing: border-box;
  height: 15%;
  background: #ffffff;
  display: flex;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin: auto;
  font-size: 22px;
  font-weight: 700;
  color: #387e4b;
  cursor: pointer;
  width: 100%;
`;

const ModalEditBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  size: 22px;
  color: #387e4b;
  background: #fafbfc;
  margin: auto;
  height: 100%;
  width: 50%;
  border-bottom-left-radius: 20px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: #e1ede4;
  }
`;
const ModalDeleteBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  size: 22px;
  color: #ffffff;
  background: #387e4b;
  margin: auto;
  height: 100%;
  width: 50%;
  border-bottom-right-radius: 20px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: #e1ede4;
    color: #387e4b;
  }
`;

export default ProjectModalEdit;
