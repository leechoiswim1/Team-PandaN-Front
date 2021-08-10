import React, { useEffect } from "react";
/* == Library - style */
import styled from "styled-components";
import { t }  from "../../util/remConverter";
import { Bookmark } from "react-feather";

/* == Library - date */
import moment from "moment";

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
    } else return; 
  }
  
  return (
    <Wrapper>
      <div style={{display: "flex", flexDirection: "row"}}>
        <div>
          <IconSteps type={step}/> 
        </div>
        <NoteDesc>
          <a href={`/projects/${projectId}/notes/${noteId}`}>{title}</a>
          <div>
            { projectTitle && <span className="text-primary">{projectTitle}</span> }
            { writer && <span>{writer}</span> }
            { createdAt && <span>{created}</span> }
          </div>          
        </NoteDesc>
      </div>
      <div>
        { rest.type === "bookmark" &&  
          <button type="button">
            <Bookmark fill="#387E4B" stroke="#387E4B"/>  
          </button> 
        }        
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div(...t`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #ddd;
`)

const NoteDesc = styled.div(...t`
  padding: 0 16px;
  a {
    font-weight: 500;
    text-decoration: none;
  }
  span {
    margin-right: 16px;
  }
  div :last-child {
    margin-right: 16px;
    color: #888;
  }
`)

export default IssueCard;