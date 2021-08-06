import React, { useEffect } from "react";
/* == Library - style */
import styled from "styled-components";
import { t }  from "../../util/remConverter";
import { CheckSquare, Bookmark } from "react-feather";
/* == Redux - actions */
import { useDispatch }   from 'react-redux';
import { noteActions }                from '../../modules/note';

// * == ( IssueCard / Note ) -------------------- * //
const IssueCard = (props) => {
  const dispatch = useDispatch();
  const {projectId, noteId, title, content, deadline, step, ...rest} = props; 

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
          <CheckSquare />
          {step}
        </div>
        <NoteDesc>
          <a href={`/projects/${projectId}/notes/${noteId}`}>{title}</a>
          <div>
            { rest.projectTitle ? 
              <span className="text-primary">프로젝트 이름</span> :
              <span className="text-primary">작성자</span>
            }         
            <span>{deadline}</span>
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
  div span:last-child {
    margin-left: 16px;
    color: #888;
  }
`)

export default IssueCard;