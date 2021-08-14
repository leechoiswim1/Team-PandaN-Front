import React, { useEffect } from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
/* == Custom - Component */
import { Template, IssueList, EmptyBoard } from "../../components";
/* == Redux - actions */
import { useSelector, useDispatch } from "react-redux";
import { noteActions } from "../../modules/note";

// * == ( Bookmark - Note ) -------------------- * //
const Bookmark = ({ history, match, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(noteActions.__getBookmark());
  }, []);

  const bookmarkList = useSelector(state => state.note.list);
  return (
    <Template>
      <div className="content" id="content">
        <div className="note-board-container">
          { bookmarkList && <IssueList history={history} notes={bookmarkList} type="bookmark" /> }
          { bookmarkList.length === 0 && <EmptyBoard type="bookmark"/> }
        </div>
      </div>
    </Template>
  );
};

export default Bookmark;
