import React, { useEffect } from "react";

/* == Custom - Component */
import { Template, IssueList, EmptyBoard, Paging } from "../../components";
/* == Redux - actions */
import { useSelector, useDispatch } from "react-redux";
import { noteActions } from "../../modules/note";

// * == ( Bookmark - Note ) -------------------- * //
const Bookmark = ({ history, match, ...rest }) => {
  const dispatch = useDispatch();
  const bookmarkList = useSelector((state) => state.note.bookmark);
  const isLoading = useSelector((state) => state.note.is_loading);
  const paging = useSelector((state) => state.note.bookPaging);
  useEffect(() => {
    dispatch(noteActions.__getBookmark(1, paging.size));
  }, []);

  return (
    <Template match={match}>
      <div className="content" id="content">
        <div className="note-board-container">
          {bookmarkList.length === 0 ? (
            <EmptyBoard type="bookmark" />
          ) : (
            <>
              <div>
                <IssueList history={history} notes={bookmarkList} type="bookmark" totalElements={paging.totalElements} />
              </div>
              <div style={{ height: "10%" }}>
                <Paging paging={paging} module={noteActions.__getBookmark} isLoading={isLoading} />
              </div>
            </>
          )}
        </div>
      </div>
    </Template>
  );
};

export default Bookmark;
