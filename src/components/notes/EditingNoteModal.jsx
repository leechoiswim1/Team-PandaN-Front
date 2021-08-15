import React, { useState, useRef } from "react";

/* == Library - style */
import styled, { css } from "styled-components";
import { t }  from "../../util/remConverter";

/* == Custom - Element */
import { Form } from "react-bootstrap";
import ModalBox from "../../elements/ModalBox";

/* == Redux - actions */
import { useSelector, useDispatch }   from 'react-redux';
import { noteActions }                from '../../modules/note';

// * == ( Note - editing note modal ) -------------------- * //
const EditingNoteModal = (props) => {
  const { 
    className, 
    visible, 
    onClose,
    maskClosable,
    closable, 
    noteId,
    note } = props;
  const dispatch = useDispatch();

  const [noteInputs, setNoteInputs] = useState({
    title: note.title,
    content: note.content,
    deadline: note.deadline,
    step: note.step,
  });

  const editNote = (e) => {
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

    dispatch(noteActions.__editNote(noteId, noteInputs));
    onClose(e);
  };

  return (
    <ModalBox 
      visible={visible} 
      className={className} 
      maskClosable={maskClosable}
      onClose={onClose}
      closable={closable}
      heading="할 일 수정하기" 
      btntext="수정하기"
      onSubmit={editNote}
      >
      <Form>
        <Form.Group controlId="noteTitle">
          <Form.Label className="note-modal-label">할 일</Form.Label>
          <Form.Control type="text" placeholder="제목을 입력해 주세요." defaultValue={note.title} maxLength={255}
            onChange={(e)=> {setNoteInputs({...noteInputs, title: e.target.value})}}
          />
          <Form.Text className="text-muted">
            최대 255자까지 입력 가능합니다.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="noteDetail">
          <Form.Label className="note-modal-label">설명</Form.Label>
          <Form.Control type="text" placeholder="할 일에 대한 설명을 추가해 주세요." defaultValue={note.content}
            as="textarea"
            style={{ height: "100px" }}
            onChange={(e)=> {setNoteInputs({...noteInputs, content: e.target.value})}}
          />
        </Form.Group>
        <Form.Group controlId="noteStep">
          <Form.Label className="note-modal-label">상태 설정</Form.Label>
          <Form.Select placeholder="" defaultValue={note.step}
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
          <Form.Control type="date" placeholder="" defaultValue={note.deadline}
            onChange={(e)=> {setNoteInputs({...noteInputs, deadline: e.target.value})}}
          />
        </Form.Group>
      </Form>
    </ModalBox>
  )
}

export default EditingNoteModal;