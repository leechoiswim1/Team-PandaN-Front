import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { actionCreators as projectActions } from "../modules/project";
import { useSelector } from "react-redux";

const ProjectModalEdit = props => {
  const dispatch = useDispatch();
  const project_list = useSelector(state => state.project.list);

  //   const [modifiedProject, setModifiedProject] = useState(project_list)
  const id = window.location.pathname.split("/projects/")[1];
  const [lgShow, setLgShow] = useState(false);
  //   const [ProTitle, setProTitle] = useState("");
  //   const [ProDesc, setProDesc] = useState("");

  const EditProject = () => {
    if (ProTitle === "") {
      window.alert("프로젝트 이름을 입력해주세요!");
      return;
    }
    const project = {
      title: ProTitle,
      detail: ProDesc,
    };
    dispatch(projectActions.__putProject(project));
  };

  const changeProTitle = e => {
    setProTitle(e.target.value);
  };

  const changeProDesc = e => {
    setProDesc(e.target.value);
  };

  return (
    <>
      <Button onClick={() => setLgShow(true)}>프로젝트생성</Button>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{ margin: "auto" }}
            id="example-modal-sizes-title-lg"
          >
            프로젝트생성하기
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form style={{ margin: "1vh 3vw 2vh 3vw" }}>
            <h4>프로젝트 제목ㅎㅎ</h4>
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="프로젝트 제목"
              onChange={changeProTitle}
            />
            <h4>프로젝트 내용 (선택사항)</h4>
            <textarea
              style={{ width: "100%", height: "30vh" }}
              type="text"
              placeholder="프로젝트 내용"
              onChange={changeProDesc}
            ></textarea>
            <Button onClick={() => {}} style={{ width: "30%", margin: "auto" }}>
              수정하기
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProjectModalEdit;
