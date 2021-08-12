import React  from "react";
/* == Library - style */
import styled from "styled-components";
import { t }  from "../../util/remConverter";
/* == Custom - Component */
import { IssueCard } from "..";

// * == ( IssueList / Note ) -------------------- * //
const IssueList = ({ history, notes, projectId, ...rest }) => {
  /* 
  - 상위 페이지 : Bookmark, MyNote, ProjectIssue, ProjectMyNote
  - 상위 페이지에서 넘겨받은 notes의 각 노트 해당 속성값을 issue card에 props로 넣어줍니다.  
  - 상위 페이지가 "pages/notes/Bookmark" 일 경우 type="bookmark"를 issue card 내부로 전달해야 합니다.
    이 속성을 주어야 북마크 페이지 내에서 북마크 아이콘이 출력됩니다.
  */
  return (
    <>
      {notes.map((note, index) => {
        return (
          <IssueCard
            key={index}             
            projectId={note.projectId ? note.projectId : projectId}
            projectTitle={note.projectTitle}
            noteId={note.noteId}
            title={note.title}
            content={note.content}
            writer={note.writer}
            deadline={note.deadline}
            createdAt={note.createdAt}
            step={note.step}
            type={rest.type}
          />
        );
      })}
    </>
  );
};

export default IssueList;