import React from "react";
/* == Library - icon */
import { Bookmark } from "react-feather";
/* == Library - date */
import moment from "moment";
/* == Library - router */
import { Link } from "react-router-dom";

/* == Custom - icon */
import IconSteps from "../../elements/IconSteps";
/* == Custom - elements */
import Labels from "../../elements/Labels";

/* == Redux - actions */
import { useDispatch } from "react-redux";
import { noteActions } from "../../modules/note";

// * == ( IssueCard / Note ) -------------------- * //
const IssueCard = (props) => {
  const dispatch = useDispatch();
  const { projectId, projectTitle, noteId, title, content, writer, deadline, step, createdAt, ...rest } = props;
  const created = moment(createdAt).format("작성일: YYYY년 M월 D일");

  const deleteBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = window.confirm("북마크에서 삭제하시겠습니까?");
    if (result) {
      dispatch(noteActions.__deleteBookmark(noteId));
      dispatch(noteActions.setBookmark(noteId));
    } else return;
  };

  return ( 
    <div className="note-issuecard-wrapper">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <IconSteps type={step} />
        </div>
        <div className="note-issuecard-content">
          <Link to={`/projects/${projectId}/notes/${noteId}`}>
            <h1>{title}</h1>
          </Link>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            {projectTitle && (
              <Link to={`/projects/${projectId}/kanban`}>
                <span className="note-issuecard-title">{projectTitle}</span>
              </Link>
            )}
            {writer && <span>{writer}</span>}
            {createdAt && <span>{created}</span>}
            <Labels type={step}>{step}</Labels>
          </div>
        </div>
      </div>
      <div>
        {rest.type === "bookmark" && (
          <button type="button" onClick={deleteBookmark}>
            <Bookmark fill="#387E4B" stroke="#387E4B" />
          </button>
        )}
      </div>
    </div>
  );
};

export default IssueCard;
