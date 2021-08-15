import React, { useEffect } from "react";
/* == Library - style */
import styled, { css } from "styled-components";
import { t }  from "../../util/remConverter";
import { Bookmark } from "react-feather";

/* == Library - date */
import moment from "moment";

/* == Library - router */
import { Link } from "react-router-dom";

/* == Custom - Icon */
import IconSteps                        from "../../elements/IconSteps";

/* == Redux - actions */
import { useDispatch }   from 'react-redux';
import { noteActions }                from '../../modules/note';

// * == ( IssueCard / Note ) -------------------- * //
const IssueCard = (props) => {
  const dispatch = useDispatch();
  const { 
    projectId, 
    projectTitle,
    noteId, 
    title, 
    content, 
    writer,
    deadline, 
    step, 
    createdAt, 
    ...rest } = props; 
  const created = moment(createdAt).format("작성일: YYYY년 M월 D일");

  const deleteBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = window.confirm("북마크에서 삭제하시겠습니까?");
    if (result) {
      dispatch(noteActions.__deleteBookmark(noteId));
      dispatch(noteActions.setBookmark(noteId));
    } else return; 
  }
  
  return (
    <div className="note-issuecard-wrapper">
      <div style={{display: "flex", flexDirection: "row"}}>
        <div>
          <IconSteps type={step}/> 
        </div>
        <div className="note-issuecard-content">
          <Link to={`/projects/${projectId}/notes/${noteId}`}>
            <h1>{title}</h1>
          </Link>
          <div>
            {/* <Tag className="kanban-card-tag" type={step}>
              { step }
            </Tag> */}
            { projectTitle && 
              <Link to={`/projects/${projectId}/kanban`}>
                <span className="note-issuecard-title">{projectTitle}</span>
              </Link> 
            }
            { writer && <span>{writer}</span> }
            { createdAt && <span>{created}</span> }
          </div>          
        </div>
      </div>
      <div>
        { rest.type === "bookmark" &&  
          <button type="button" onClick={deleteBookmark}>
            <Bookmark fill="#387E4B" stroke="#387E4B"/>  
          </button> 
        }        
      </div>
    </div>
  );
};

// const Tag = styled.div`
// ${(props) => (props.type === "STORAGE") && 
//   css`  
//     background-color: #FFCD40;
//   `}
// ${(props) => (props.type === "TODO") && 
//   css`  
//     background-color: #ADBE4F;
//   `}
// ${(props) => (props.type === "PROCESSING") && 
// css`  
//   background-color: #9BD09C;
// `}
// ${(props) => (props.type === "DONE") && 
//   css`  
//     background-color: #F5DAAE;
//   `}
// `

export default IssueCard;