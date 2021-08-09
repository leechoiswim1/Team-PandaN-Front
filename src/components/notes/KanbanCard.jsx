import React  from "react";
/* == Library - style */
import styled, { css } from "styled-components";
import moment from "moment";
import "moment/locale/ko";

// * == ( kanban / Note ) -------------------- * //
const KanbanCard = ({ note, ...rest }) => {
  const deadline = moment(note.deadline).toNow();
  return (
    <div className="kanban-card">
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <Tag className="kanban-card-tag" type={note.step}>
        {note.step}
      </Tag>
      <hr />
      <p>{deadline}</p>
    </div>
  );
};

const Tag = styled.div`
${(props) => (props.type === "STORAGE") && 
  css`  
    background-color: #E1D3F8;
  `}
${(props) => (props.type === "TODO") && 
  css`  
    background-color: #CCE4F8;
  `}
${(props) => (props.type === "PROCESSING") && 
css`  
  background-color: #FFE3B0;
`}
${(props) => (props.type === "DONE") && 
  css`  
    background-color: #F9CDE5;
  `}
`

export default KanbanCard;