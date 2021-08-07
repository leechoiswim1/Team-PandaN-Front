import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { actionCreators as projectActions } from "../../modules/project";
import { history } from "../../modules/configStore";
const ProjectModalEdit = props => {
  const dispatch = useDispatch();

  const id = props.props.projectId;

  const [ProTitle, setProTitle] = useState(props.title);
  const [ProDesc, setProDesc] = useState(props.detail);
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

  const changeProTitle = e => {
    setProTitle(e.target.value);
  };

  const changeProDesc = e => {
    setProDesc(e.target.value);
  };

  return (
    <>
      <Button onClick={() => setLgShow(true)}>수정</Button>

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
            <h4>프로젝트 제목</h4>
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="프로젝트 제목"
              onChange={changeProTitle}
              defaultValue={ProTitle}
            />
            <h4>프로젝트 내용 (선택사항)</h4>
            <textarea
              style={{ width: "100%", height: "10vh" }}
              type="text"
              placeholder="프로젝트 내용"
              onChange={changeProDesc}
              defaultValue={ProDesc}
            ></textarea>
            <Button
              onClick={() => {
                editProject();
              }}
            >
              수정
            </Button>
            <Button
              onClick={() => {
                deleteProject();
              }}
            >
              삭제
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProjectModalEdit;
