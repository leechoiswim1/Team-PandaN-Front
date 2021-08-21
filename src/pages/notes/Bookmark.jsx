import React, { useEffect } from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
/* == Custom - Component */
import { Template, IssueList, EmptyBoard } from "../../components";
/* == Redux - actions */
import { useSelector, useDispatch } from "react-redux";
import { noteActions } from "../../modules/note";
import { Paging } from "../../components";

// * == ( Bookmark - Note ) -------------------- * //
const Bookmark = ({ history, match, ...rest }) => {
  const dispatch = useDispatch();
  const bookmarkList = useSelector((state) => state.note.bookmark);
  const isLoading = useSelector((state) => state.note.is_loading);
  const paging = useSelector((state) => state.note.bookPaging);
  useEffect(() => {
    dispatch(noteActions.__getBookmark(paging.pageNumber, paging.size));
  }, [dispatch, paging]);

  return (
    <Template>
      <div className="content" id="content">
        <div className="note-board-container">
          <p style={{ fontWeight: "500" }}>
            북마크 총 <span style={{ color: "#387E4B", fontWeight: "700", fontSize: "16px" }}>{paging.totalElements}</span>개
          </p>

          <div style={{ height: "90%" }}>
            {bookmarkList && <IssueList history={history} notes={bookmarkList} type="bookmark" />}
            {bookmarkList.length === 0 && <EmptyBoard type="bookmark" />}
          </div>
          <div style={{ height: "10%" }}>
            <Paging paging={paging} module={noteActions.__getBookmark} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </Template>
  );
};

export default Bookmark;
