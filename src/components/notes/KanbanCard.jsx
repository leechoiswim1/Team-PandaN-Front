import React  from "react";
/* == Library - style */
import styled, { css } from "styled-components";
import moment from "moment";
import "moment/locale/ko";

// * == ( kanban / Note ) -------------------- * //
const KanbanCard = ({ note, step, ...rest }) => {
  const deadline = moment(note.deadline).toNow();
  return (
    <div className="kanban-card">
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <Tag className="kanban-card-tag" type={step}>
        {step}
      </Tag>
      <hr />
      <p>{deadline}</p>
    </div>
  );
};

const Tag = styled.div`
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
`

export default KanbanCard;