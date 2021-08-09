import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const NoteModal = () => {
  const [lgShow, setLgShow] = useState(false);
  const [NoteTitle, setNoteTitle] = useState("");
  const [NoteDesc, setNoteDesc] = useState();

  const noteModal = () => {
    if (NoteTitle === "" && NoteDesc === "") {
      window.alert("제목,내용을 입력해주세요!! ");
      return;
    }

    if (NoteTitle === "") {
      window.alert("제목을 입력해주세요!");
      return;
    }

    if (NoteDesc === "") {
      window.alert("내용을 입력해주세요!");
      return;
    }
  };

  const changeNoteTitle = e => {
    setNoteTitle(e.target.value);
  };

  const changeNoteDesc = e => {
    setNoteDesc(e.target.value);
  };

  return (
    <>
      <Button onClick={() => setLgShow(true)}>✏문서작성</Button>
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
            판단할일생성
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form style={{ margin: "1vh 3vw 2vh 3vw" }}>
            <h3>제목을 입력해주세요.</h3>
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="할 일 제목"
              onChange={changeNoteTitle}
            />
            <h4>내용을 입력해주세요!</h4>
            <textarea
              style={{ width: "100%", height: "30vh" }}
              type="text"
              placeholder="할 일 내용"
              onChange={changeNoteDesc}
            ></textarea>
            <Button
              onClick={() => {
                noteModal();
              }}
              style={{ width: "30%", margin: "auto" }}
            >
              저장
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NoteModal;
