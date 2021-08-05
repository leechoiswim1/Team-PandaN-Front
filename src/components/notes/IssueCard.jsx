import React  from "react";
/* == Library - style */
import styled from "styled-components";
import { t }  from "../../util/remConverter";
import { CheckSquare } from "react-feather";

// * == ( IssueCard / Note ) -------------------- * //
const IssueCard = ({projectId, noteId, title, content, deadline, step, ...rest}) => {
  return (
    <Wrapper>
      <div>
        <CheckSquare />
      </div>
      <NoteDesc>
        {/* {projectId}{noteId} */}
        <a href="/projects/60/notes/10">글제목{title}{step}</a>
        <div>
          { rest.projectTitle ? 
            <span className="text-primary">프로젝트 이름</span> :
            <span className="text-primary">작성자</span>
          }         
          <span>일정{deadline}</span>
        </div>
      </NoteDesc>
    </Wrapper>
  );
};

const Wrapper = styled.div(...t`
  display: flex;
  flex-direction: row;
  padding: 16px;
  border-bottom: 1px solid #ddd;
`)

const NoteDesc = styled.div(...t`
  padding: 0 16px;
  & a{
    font-weight: 500;
    text-decoration: none;
  }; 
  & div span:last-child {
    margin-left: 16px;
    color: #888;
  }
`)

export default IssueCard;