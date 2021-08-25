import React, { useEffect, useCallback, useState } from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
import _ from "lodash";
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
    dispatch(noteActions.__getMyNote(paging.pageNumber, paging.size));
  }, [dispatch, paging]);

  return (
    <Template match={match}>
      <div className="content" id="content">
        <div className="note-board-container" style={{ height: "100%", display: "block" }}>
          <p style={{ fontWeight: "500" }}>
            내가 작성한 문서 총 <span style={{ color: "#387E4B", fontWeight: "700", fontSize: "16px" }}>{paging.totalElements}</span>개
          </p>
          <div style={{ height: "95%" }}>
            {myNoteList && <IssueList history={history} notes={myNoteList} type="myNote" />}
            {myNoteList.length === 0 && <EmptyBoard type="myNote" />}
          </div>
          <div style={{ height: "5%" }}>
            <Paging paging={paging} module={noteActions.__getMyNote} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </Template>
  );
};

export default MyNote;
