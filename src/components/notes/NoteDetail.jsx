import React, { useState, useEffect } from "react";

/* == Library - style */
import styled, { css } from "styled-components";
import { Bookmark, Clock, Edit3 } from "react-feather";

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

  const [modalVisible, setModalVisible] = useState(false)
  const openModal = () => {
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }

  // function - bookmark
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

        <div className="note-detail-header-step" style={{display: "flex", justifyContent: "space-between"}}>
          <div>
            <IconSteps type={note.step}/> 
            <span>{note.step}</span>            
          </div>
          <div>
          {!isBookmark ? 
            <button type="button" onClick={addBookmark}>
              <Bookmark/>  
            </button> : 
            <button type="button" onClick={deleteBookmark}>
              <Bookmark fill="#387E4B" stroke="#387E4B"/>  
            </button>   
          } 
          </div>
        </div>    
      
        <div className="note-detail-header-title">          
          <h1 className="note-detail-header-title-heading">
            {note.title}
          </h1>       
          <Edit3 className="note-detail-header-title-svg" onClick={openModal} style={{cursor: "pointer"}}/>
            { modalVisible && 
              <EditingNoteModal
                note={note}
                noteId={noteId}
                visible={modalVisible}
                closable={true}
                maskClosable={true}
                onClose={closeModal} />
            }        
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