import React, { useState, useEffect } from "react";

/* == Library - style */
import styled from "styled-components";
import { t }  from "../../util/remConverter";
import { Bookmark, Edit, Trash2 } from "react-feather";

/* == Library - date */
import moment from "moment";
import "moment/locale/ko";

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
  
  const deadline = note.deadline ? moment(note.deadline).format("마감: YYYY년 M월 D일") : "";
  const createdAt = moment(note.createdAt).format("작성: YYYY년 M월 D일");
  const modifiedAt = moment(note.modifiedAt).format("마지막 수정: YYYY년 M월 D일");

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
    <div style={{display: "flex", flexDirection: "column"}}>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <div>
          <IconSteps type={note.step}/> 
          <span>{note.step}</span>
          <span style={{marginLeft: "16px"}}>{deadline}</span>
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
      <div style={{display: "flex", padding: "16px 0"}}>
        <div>
          <h2>{note.title}</h2>
          <p style={{marginRight: "16px"}}>{createdAt}</p>
          <p>{modifiedAt}</p>
          <p>{note.writer}</p>
        </div>
        <div style={{marginLeft: "16px"}}>          
          <Edit onClick={openModal}/>
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
      </div>
      <div>
        <p>{note.content}</p>      
      </div>
    </div>
  );
};

export default NoteDetail;