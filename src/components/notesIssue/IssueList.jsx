import React from "react";
/* == Library - date */
import moment from "moment";
/* == Library - router */
import { Link } from "react-router-dom";
/* == Library - icon */
import { Bookmark } from "react-feather";
/* == Custom - icon */
import IconSteps from "../../elements/IconSteps";
/* == Custom - elements */
import Labels from "../../elements/Labels";
import { ReactComponent as Storage } from "../../styles/images/icon-status-todolist.svg";
import { ReactComponent as IconBookMark } from "../../styles/images/ico-bookmark.svg";

/* == Redux - actions */
import { useDispatch } from "react-redux";
import { noteActions } from "../../modules/note";

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
      <div className="table-responsive">
        <table className="table note-issue-table">
          <colgroup className="note-issue-colgroup">
            <col width="7%"/>
            <col width="7%"/>
            <col />
            <col />
            <col width="20%"/>
            <col width="20%"/>
            <col width="5%"/>
          </colgroup>
          <thead>
            <tr>
              <th>
                <Storage fill="#767676" width="20" height="20" />
              </th>
              <th>NO.</th>
              <th>제목</th>
              <th>{rest.type === "bookmark" || rest.type === "myNote" ? "프로젝트" : ""}</th>
              <th>{rest.type === "bookmark" ? "작성자" : "마지막 수정"}</th>
              <th>상태</th>
              <th>{rest.type === "bookmark" ? <IconBookMark width="24px" height="24px" fill="#767676" /> : ""}</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => {
              return (
                <tr key={index}>
                  <IssueCard
                  history={history}
                  index={index}
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default IssueList;
