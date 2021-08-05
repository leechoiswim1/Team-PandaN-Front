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
  console.log(note)

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <div>
          <span>{note.step}</span>
          <span style={{marginLeft: "24px"}}>{note.deadline}까지</span>
        </div>
        <div>
          <Bookmark />
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