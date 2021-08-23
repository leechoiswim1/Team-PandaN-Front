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
import { noteKanbanActions } from "../../modules/noteKanban";

// * == ( IssueCard / Note ) -------------------- * //
const IssueCard = (props) => {
  const dispatch = useDispatch();
  const { history, projectId, projectTitle, noteId, title, content, writer, deadline, step, createdAt, ...rest } = props;
  const created = moment(createdAt).format("작성일: YYYY년 M월 D일");

  const deleteBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = window.confirm("북마크에서 삭제하시겠습니까?");
    if (result) {
      dispatch(noteKanbanActions.__deleteBookmark(noteId));
      dispatch(noteActions.setBookmark(noteId));
    } else return;
  };

  return ( 
    <>
      <td>
        <IconSteps type={step} />
      </td>
      <td>{rest.index + 1}</td>
      <td onClick={(e) => history.push(`/projects/${projectId}/notes/${noteId}`)}>{title}</td>
      <td onClick={(e) => history.push(`/projects/${projectId}/kanban`)}>{projectTitle && projectTitle}</td>
      <td>{createdAt ? moment(createdAt).format("YYYY. M. D") : writer}</td>
      <td>
        <Labels type={step} badge></Labels>
        {step}
      </td>
      <td>
        {rest.type === "bookmark" && (
          <button type="button" onClick={deleteBookmark}>
            <Bookmark fill="#387E4B" stroke="#387E4B" />
          </button>
        )}
      </td>
    </>
  );
};

export default IssueCard;
