import React, { useEffect } from "react";
/* == Library - style */
import styled from "styled-components";
import { t }  from "../../util/remConverter";
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
  console.log(note)

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <h4>{note.title}</h4>

      <p>해당 글 수정 삭제, 북마크 , 댓글 목록, 댓글 작성/수정/삭제</p>
      <p>{note.step}</p>
      <p>{note.deadline} 까지</p>
      <p>{note.content}</p>      
    </div>
  );
};

export default NoteDetail;