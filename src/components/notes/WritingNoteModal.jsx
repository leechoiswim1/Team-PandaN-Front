import React, { useState } from "react";

/* == Library - style */
import styled, { css } from "styled-components";
import { t }  from "../../util/remConverter";

/* == Custom - Element */
import { Form } from "react-bootstrap";
import ModalBox from "../../elements/ModalBox";

/* == Redux - actions */
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
  } = props;

  return (
    <ModalBox 
      visible={visible} 
      className={className} 
      maskClosable={maskClosable}
      onClose={onClose}
      closable={closable}
      heading="할 일 만들기" 
      btntext="할 일 만들기">
      <Form>
        <Form.Group controlId="noteTitle">
          <Form.Label className="note-modal-label" htmlFor="noteTitle">할 일</Form.Label>
          <Form.Control type="text" placeholder="" id="noteTitle"/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label className="note-modal-label">할 일에 대한 설명</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Label className="note-modal-label">진행 단계</Form.Label>
          <Form.Select placeholder="">
            <option>진행 단계</option>
            <option value="1">STORAGE</option>
            <option value="2">TO DO</option>
            <option value="3">PROCESSING</option>
            <option value="4">DONE</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Label className="note-modal-label">언제까지 끝내야 하나요?</Form.Label>
          <Form.Control type="date" placeholder="" />
        </Form.Group>
      </Form>
    </ModalBox>
  )
}

export default WritingNoteModal;