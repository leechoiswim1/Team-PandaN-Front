import React, { useState } from "react";

/* == Library - route */
import { useLocation, useParams } from "react-router-dom";
/* == Library - style */
import styled, { css } from "styled-components";
import { t }  from "../../util/remConverter";

/* == Custom - Element */
import { Form } from "react-bootstrap";
import ModalBox from "../../elements/ModalBox";

/* == Redux - actions */
import { history } from "../../modules/configStore";
import { useSelector, useDispatch }   from 'react-redux';
import { noteActions }                from '../../modules/note';

// * == ( Note - writing note modal ) -------------------- * //
const WritingNoteModal = (props) => {
  const { 
    className, 
    visible, 
    onClose,
    maskClosable,
    closable, 
    projectId,
    projectStep } = props;

  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();

  const [noteInputs, setNoteInputs] = useState({
    title: "",
    content: "",
    deadline: "",
    step: "",
  });

  const addNote = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (noteInputs.title === "") {
      window.alert("할 일을 입력하세요.");
      return;
    }
    if (noteInputs.content === "") {
      window.alert("할 일에 대한 설명을 추가하세요.");
      return;
    }
    if (noteInputs.step === "") {
      window.alert("할 일의 상태를 설정하세요.");
      return;
    }
    if (noteInputs.deadline === "") {
      window.alert("마감일을 입력하세요.");
      return;
    }
    
    dispatch(noteActions.__addNote(projectId, noteInputs));
    onClose(e);
    if (!params.noteId) {
      window.location.replace(location.pathname);
    }
    if (params.noteId) {
      history.push(`/projects/${params.projectId}/kanban`);
    }
    
  };

  return (
    <ModalBox 
      visible={visible} 
      className={className} 
      maskClosable={maskClosable}
      onClose={onClose}
      closable={closable}
      heading="할 일 만들기" 
      btntext="할 일 만들기"
      onSubmit={addNote}
      >
      <Form>
        <Form.Group controlId="noteTitle">
          <Form.Label className="note-modal-label">할 일</Form.Label>
          <Form.Control type="text" placeholder="제목을 입력해 주세요." maxLength={255}
            onChange={(e)=> {setNoteInputs({...noteInputs, title: e.target.value})}}
          />
          <Form.Text className="text-muted">
            최대 255자까지 입력 가능합니다.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="noteDetail">
          <Form.Label className="note-modal-label">설명</Form.Label>
          <Form.Control type="text" placeholder="할 일에 대한 설명을 추가해 주세요."
            as="textarea"
            style={{ height: "100px" }}
            onChange={(e)=> {setNoteInputs({...noteInputs, content: e.target.value})}}
          />
        </Form.Group>
        <Form.Group controlId="noteStep">
          <Form.Label className="note-modal-label">상태 설정</Form.Label>
          <Form.Select placeholder=""
            onChange={(e)=> {setNoteInputs({...noteInputs, step: e.target.value})}}
          >
            <option value="">할 일의 상태를 설정하세요.</option>
            <option value="STORAGE">STORAGE</option>
            <option value="TODO">TO DO</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="DONE">DONE</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="noteDeadline">
          <Form.Label className="note-modal-label" >언제까지 끝내야 하나요?</Form.Label>
          <Form.Control type="date" placeholder=""
            onChange={(e)=> {setNoteInputs({...noteInputs, deadline: e.target.value})}}
          />
        </Form.Group>
      </Form>
    </ModalBox>
  )
}

export default WritingNoteModal;