import React, { useEffect } from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
/* == Custom - Component */
import { Template, IssueList, EmptyBoard } from "../../components";
/* == Redux - actions */
import { useSelector, useDispatch } from "react-redux";
import { noteActions } from "../../modules/note";

// * == ( My note - Note ) -------------------- * //
const MyNote = ({ history, match, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(noteActions.__getMyNote());
  }, []);

  const myNoteList = useSelector((state) => state.note.list);

  return (
    <Template>
      <div className="content" id="content">
        <div className="note-board-container">
          {myNoteList && <IssueList history={history} notes={myNoteList} type="myNote" />}
          {myNoteList.length === 0 && <EmptyBoard type="myNote" />}
        </div>
      </div>
    </Template>
  );
};

export default MyNote;
