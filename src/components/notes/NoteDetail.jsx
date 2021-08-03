import React  from "react";
/* == Library - style */
import styled from "styled-components";
import { t }  from "../../util/remConverter";

// * == ( note detail ) -------------------- * //
const NoteDetail = (props) => {
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <h4>해당 노트 제목</h4>

      <p>해당 글 수정 삭제, 북마크 , 댓글 목록, 댓글 작성/수정/삭제</p>
      <p>해당 노트 step</p>
      <p>일정 ~까지</p>
      <p>해당 노트 내용</p>      
    </div>
  );
};

export default NoteDetail;