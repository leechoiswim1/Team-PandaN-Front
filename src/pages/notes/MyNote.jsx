import React, { useEffect } from "react";

/* == Custom - Component */
import { Template, IssueList, EmptyBoard } from "../../components";
/* == Redux - actions */
import { useSelector, useDispatch } from "react-redux";
import { noteActions } from "../../modules/note";
import { Paging } from "../../components";

// * == ( My note - Note ) -------------------- * //
const MyNote = ({ history, match, ...rest }) => {
  const dispatch = useDispatch();
  const myNoteList = useSelector((state) => state.note.myNote);
  const isLoading = useSelector((state) => state.note.is_loading);
  const paging = useSelector((state) => state.note.paging);
  useEffect(() => {
    dispatch(noteActions.__getMyNote(1, paging.size));
  }, []);

  return (
    <Template match={match}>
      <div className="content" id="content">
        <div className="note-board-container">
          {myNoteList.length === 0 ? (
            <EmptyBoard type="myNote" />
          ) : (
            <>
              <div>
                <IssueList history={history} notes={myNoteList} type="myNote" totalElements={paging.totalElements} />
              </div>
              <div style={{ height: "10%" }}>
                <Paging paging={paging} module={noteActions.__getMyNote} isLoading={isLoading} />
              </div>
            </>
          )}
        </div>
      </div>
    </Template>
  );
};

export default MyNote;
