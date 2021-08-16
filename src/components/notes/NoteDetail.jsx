import React, { useState, useEffect } from "react";

/* == Library - style */
import styled, { css } from "styled-components";
import { Bookmark, Clock, Edit2, Trash2 } from "react-feather";

/* == Library - date */
import moment from "moment";

/* == Custom - Icon */
import IconSteps                      from "../../elements/IconSteps";

/* == Custom - Component */
import { EditingNoteModal }           from "..";

/* == Redux - actions */
import { useDispatch, useSelector }   from 'react-redux';
import { noteActions }                from '../../modules/note';

// * == ( note detail ) -------------------- * //
const NoteDetail = ({ history, match, ...rest }) => {
  const dispatch = useDispatch();
  const noteId = match.params.noteId;
  const note = useSelector((state) => state.note.detail)
  const isBookmark = note.isBookmark;
  useEffect(() => {
    dispatch(noteActions.__getNoteDetail(noteId));
  }, [noteId]);
  
  const deadline = note.deadline ? moment(note.deadline).format("YYYY년 M월 D일") : "";
  const createdAt = moment(note.createdAt).format("작성: YYYY년 M월 D일");
  const modifiedAt = moment(note.modifiedAt).format("수정: YYYY년 M월 D일");

  let dateDiff = note.deadline ? moment(note.deadline).diff(moment(), "days") : "" ;

  /* 
   * Function - Modal
   * modalVisible : project menu > 노트 작성 모달의 state와 구분
   */
  const [modalVisible, setModalVisible] = useState(false)
  const openModal  = () => {setModalVisible(true)}
  const closeModal = () => {setModalVisible(false)}
  /* 
   * Function - delete note 
   */
  const deleteNote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = window.confirm("노트를 삭제하시겠습니까?");
    if (result) {
      dispatch(noteActions.__deleteNote(noteId));
    } else return;  
  };
  /* 
   * Function - Bookmark ( 북마크 추가 / 삭제 )
   */
  const addBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(noteActions.__addBookmark(noteId));
  }
  const deleteBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = window.confirm("북마크에서 삭제하시겠습니까?");
    if (result) {
      dispatch(noteActions.__deleteBookmark(noteId));
    } else return;    
  }

  return (
    <div className="note-detail-wrapper">

      <div className="note-detail-header">

        <div className="note-detail-header-step">
          <div>
            <IconSteps type={note.step}/> 
            <span>{note.step}</span>            
          </div>

         
          <div>
            {/* buttons - edit */}
            <button type="button" onClick={openModal} className="note-detail-header-button">
              <Edit2 />
            </button>
              { modalVisible && 
                <EditingNoteModal 
                  note={note} noteId={noteId} visible={modalVisible} closable={true} maskClosable={true} onClose={closeModal} />
              }

            {/* buttons - delete */}
            <button type="button" onClick={deleteNote} className="note-detail-header-button">
              <Trash2/>
            </button>
            
            {/* buttons - bookmark */}
            {!isBookmark ? 
            <button type="button" onClick={addBookmark} className="note-detail-header-button">
              <Bookmark />  
            </button> : 
            <button type="button" onClick={deleteBookmark} className="note-detail-header-button">
              <Bookmark fill="#387E4B" stroke="#387E4B" />  
            </button>   
            } 
          </div>
        </div>    
      
        <div className="note-detail-header-title">          
          <h1 className="note-detail-header-title-heading">
            {note.title}
          </h1>
        </div>

        <div className="note-detail-header-info">
          <div className="note-detail-crew-tag">
            {note.writer}
          </div>
          <Tag className="note-detail-tag" type={note.step} dateDiff={dateDiff}>
            <Clock/>
            {deadline}
          </Tag>
          
        </div>

      </div>

      <div className="note-detail-content">
        <p>{note.content}</p>      
      </div>
      <div className="note-detail-footer">
        <p>{createdAt}</p>
        <p>{modifiedAt}</p>
      </div>
    </div>
  );
};

const Tag = styled.div`
${(props) => (!props.type) && 
  css`  
    background-color: #767676;
  `}
${(props) => (props.type === "STORAGE") && 
  css`  
    background-color: #FFCD40;
  `}
${(props) => (props.type === "TODO") && 
  css`  
    background-color: #ADBE4F;
  `}
${(props) => (props.type === "PROCESSING") && 
css`  
  background-color: #9BD09C;
`}
${(props) => (props.type === "DONE") && 
  css`  
    background-color: #F5DAAE;
  `}
  color: ${(props) => props.dateDiff <= -1 ? "#B00033" : "#fff"};
`

export default NoteDetail;