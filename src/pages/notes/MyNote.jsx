import React, { useEffect } from "react";
/* == Library - style */
import styled from "styled-components";
import { t }  from "../../util/remConverter";
/* == Custom - Component */
import { Template, IssueList } from "../../components";
/* == Redux - actions */
import { useSelector, useDispatch }   from 'react-redux';
import { noteActions }                from '../../modules/note';

// * == ( My note - Note ) -------------------- * //
const MyNote = ({ history, match, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(noteActions.__getProjectIssue(60)); // 현재 projectId 60 의 issue 형태 조회
    // dispatch(noteActions.__getMyNote());
  }, []);

  const myNoteList = useSelector((state) => state.note.list)

  return (
    <Template>
      <div className="content">
        <Container>
          <IssueList history={history} notes={myNoteList} type="myNote"/>
        </Container>
      </div>
    </Template>
  );
};

const Container = styled.div(...t`
  width: 100%;
  height: calc( 100% - 120px );
  padding: 0 36px;
  overflow: auto;
`)

export default MyNote;
