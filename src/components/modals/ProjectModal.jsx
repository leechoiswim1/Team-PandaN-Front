import React, { useState } from "react";

import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";

import { actionCreators as projectActions } from "../../modules/project";
import { useDispatch } from "react-redux";

import { t } from "../../util/remConverter";
import { ReactComponent as IconProjectAdd } from "../../styles/images/ico-project-add.svg";

const ProjectModal = () => {
  const dispatch = useDispatch();

  const [lgShow, setLgShow] = useState(false);
  const [ProTitle, setProTitle] = useState("");
  const [ProDesc, setProDesc] = useState("");

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
    setLgShow(false);
  };

  const changeProTitle = e => {
    setProTitle(e.target.value);
  };

  const changeProDesc = e => {
    setProDesc(e.target.value);
  };

  return (
    <>
      <IconProjectAdd
        width="40"
        height="40"
        fill="#9A9A9A"
        className="menu-icon"
        onClick={() => setLgShow(true)}
      />
      <span className="menu-text" onClick={() => setLgShow(true)}>
        프로젝트 만들기
      </span>

      <Modal
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <div style={{ display: "flex", height: "25px" }}>
            <IconProjectAdd
              cursor="pointer"
              width="25px"
              height="25px"
              fill="#000000"
              className="menu-icon"
              position="absolute"
            />
            <Modal.Title
              style={{ fontWeight: "700", color: "#000000", fontSize: "15px" }}
            >
              프로젝트 생성하기
            </Modal.Title>
          </div>
        </Modal.Header>

        <Modal.Body>
          <form style={{ margin: "1vh 3vw 2vh 3vw" }}>
            <P>프로젝트 이름</P>
            <Input
              type="text"
              placeholder="프로젝트 이름"
              onChange={changeProTitle}
              maxLength="30"
            />
            <P>프로젝트 내용 (선택사항)</P>
            <TextArea
              type="text"
              placeholder="프로젝트 내용"
              onChange={changeProDesc}
              maxLength="50"
            />
            <p style={{ color: "#9A9A9A", fontSize: "7px", fontWeight: "200" }}>
              팀원들이 작업환경에 대해 쉽게 알 수 있도록 작성해주세요.
            </p>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <MakeP
            onClick={() => {
              CreateProject();
            }}
          >
            프로젝트 만들러 가기!
          </MakeP>
        </Modal.Footer>
      </Modal>
    </>
  );
};

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
  margin: auto;
  padding: 10px 0;
  color: #767676;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`,
);

const Input = styled.input(
  ...t`
  width: 100%;
  height: 5vh;
  border: 1px solid #EDEDED;
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
  border: 1px solid #EDEDED;
  font-size: 18px;
  padding: 5px;
  font-color: #9A9A9A;
  border-radius: 7px;
`,
);
export default ProjectModal;
