import React, { useEffect } from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
/* == Custom - Component */
import { Template, IssueList, EmptyBoard } from "../../components";
/* == Redux - actions */
import { useSelector, useDispatch } from "react-redux";
import { noteActions } from "../../modules/note";
import { InfiniteScroll } from "../../components";

// * == ( My note - Note ) -------------------- * //
const MyNote = ({ history, match, ...rest }) => {
  const dispatch = useDispatch();
  const myNoteList = useSelector((state) => state.note.myNote);
  const isLoading = useSelector((state) => state.note.is_loading);
  const paging = useSelector((state) => state.note.paging);
  console.log(paging);

  useEffect(() => {
    dispatch(noteActions.__getMyNote(paging.page));
  }, []);

  const callNextPage = () => {
    if (paging.next === false) {
      return;
    }
    dispatch(noteActions.__getMyNote(paging.page));
	}

  const handleScroll = (e) => { 
    console.log("스크롤 중입니다.")
    
    if (paging.next === false) {
      return;
    }

    let node = e.target;

    const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;

    if (bottom) {      
      console.log("BOTTOM REACHED:",bottom); 
      dispatch(noteActions.__getMyNote(paging.page));
    }

     
  }

  return (
    <Template>
      <div className="content" id="content">
        <div className="note-board-container" onScroll={handleScroll}>
          <InfiniteScroll
        callNextPage={callNextPage}
        isLoading={isLoading}
        isNext={paging.next ? true : false}
      >
            {myNoteList && <IssueList history={history} notes={myNoteList} type="myNote" />}
            {myNoteList.length === 0 && <EmptyBoard type="myNote" />}
            </InfiniteScroll>

          </div>
        </div>      
    </Template>
  );
};

export default MyNote;
