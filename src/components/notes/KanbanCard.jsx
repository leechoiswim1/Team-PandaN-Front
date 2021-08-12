import React  from "react";
/* == Library - style */
import styled, { css } from "styled-components";
/* == Library - icon */
import { Clock } from "react-feather";
/* == Library - date */
import moment from "moment";
// import "moment/locale/ko";

// * == ( kanban / Note ) -------------------- * //
const KanbanCard = ({ note, step, ...rest }) => {
  const deadline = note.deadline ? moment(note.deadline).format("YYYY년 M월 D일") : "" ;
  let dateDiff = note.deadline ? moment(note.deadline).diff(moment(), "days") : "" ;
  console.log(dateDiff);
  // const deadline = moment(note.deadline).toNow();
  return (
    <div className="kanban-card">
      <h1>{note.title}</h1>
      <Tag className="kanban-card-tag" type={step} dateDiff={dateDiff}>
        <Clock/>
        {deadline}
      </Tag>
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
  color: ${(props) => props.dateDiff <= -1 ? "#B00033" : "#fff"};
`

export default KanbanCard;