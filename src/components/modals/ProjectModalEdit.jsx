import React, { useState } from "react";

/* == Library */
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";
import { t } from "../../util/remConverter";

/* == Custom - Component */
import { actionCreators as projectActions } from "../../modules/project";
import { useDispatch } from "react-redux";
import { history } from "../../modules/configStore";

/* == Custom - Icon */
import { ReactComponent as IconProjectEdit } from "../../styles/images/icon-project-edit.svg";

const ProjectModalEdit = (props) => {
  const dispatch = useDispatch();

  const id = props.projectId;
  const title = props.title;
  const detail = props.detail;

  const [ProTitle, setProTitle] = useState(title);
  const [ProDesc, setProDesc] = useState(detail);
  const [lgShow, setLgShow] = useState(false);

  const deleteProject = () => {
    if (window.confirm("정말로 프로젝트를 지우시겠습니까?😲") === true) {
      dispatch(projectActions.__deleteProject(id));
      window.alert("프로젝트가 성공적으로 삭제됐습니다!🐼");
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
    window.alert("프로젝트가 성공적으로 수정됐습니다!🐼");
    setLgShow(false);
  };

  const changeProTitle = (e) => {
    setProTitle(e.target.value);
  };

  const changeProDesc = (e) => {
    setProDesc(e.target.value);
  };

  return (
    <>
      <IconProjectEdit cursor="pointer" width="25" height="25" fill="#E1EDE4" className="menu-icon" onClick={() => setLgShow(true)} />
      <Modal show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <p style={{ fontWeight: "700", color: "#000000", fontSize: "15px" }}>프로젝트수정하기</p>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form style={{ margin: "1vh 3vw 2vh 3vw" }}>
            <P>프로젝트 이름</P>
            <Input type="text" placeholder="프로젝트 제목" onChange={changeProTitle} defaultValue={title} maxLength="30" />
            <P>프로젝트 내용 (선택사항)</P>
            <TextArea type="text" placeholder="프로젝트 내용" onChange={changeProDesc} defaultValue={detail} maxLength="50" />
          </form>
        </Modal.Body>
        <ModalFooterWrap>
          <Modal.Footer
            style={{
              width: "50%",
              border: "1px solid #EDEDED",
              cursor: "pointer",
            }}
            onClick={() => {
              editProject();
            }}
          >
            <EditBtn>수정</EditBtn>
          </Modal.Footer>
          <Modal.Footer
            style={{
              width: "50%",
              border: "1px solid #EDEDED",
              cursor: "pointer",
            }}
            onClick={() => {
              deleteProject();
            }}
          >
            <EditBtn>삭제</EditBtn>
          </Modal.Footer>
        </ModalFooterWrap>
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

const EditBtn = styled.p(
  ...t`
  margin: auto;
  padding: 10px 0;
  color: #767676;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  display: center;
  
`,
);

const ModalFooterWrap = styled.div(
  ...t`
  display:flex;
`,
);
export default ProjectModalEdit;
