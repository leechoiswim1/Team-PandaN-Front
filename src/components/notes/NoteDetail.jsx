import React, { useEffect } from "react";
/* == Library - style */
import styled from "styled-components";
import { t }  from "../../util/remConverter";
import { Bookmark, Edit } from "react-feather";
/* == Redux - actions */
import { useDispatch, useSelector }   from 'react-redux';
import { noteActions }                from '../../modules/note';

// * == ( note detail ) -------------------- * //
const NoteDetail = ({ match, ...rest }) => {
  const dispatch = useDispatch();

  const noteId = match.params.noteId;
  useEffect(() => {
    dispatch(noteActions.__getNoteDetail(noteId));
  }, []);

  const note = useSelector((state) => state.note.detail)
  
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
          <span>{note.step}</span>
          <span style={{marginLeft: "16px"}}>{note.deadline}까지</span>
        </div>
        <div>

          {/* {!isBookmark ?  :  } */}
          <button type="button" onClick={addBookmark}>
            <Bookmark/>  
          </button>
          <button type="button" onClick={deleteBookmark}>
            <Bookmark fill="#387E4B" stroke="#387E4B"/>  
          </button> 
          
        </div>
      </div>
      <div style={{display: "flex", padding: "16px 0"}}>
        <div>
          <h2>{note.title}</h2>    
        </div>
        <div style={{marginLeft: "16px"}}>
          <Edit />
        </div>
      </div>
      <div>
        <p>{note.content}</p>      
      </div>
    </div>
  );
};

export default NoteDetail;