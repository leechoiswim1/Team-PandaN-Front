import React, { useEffect, useState } from "react";
/* == Library - style */
import styled from "styled-components";
import { t }  from "../../util/remConverter";
/* == Custom - Component */
import { Template, SubHeader, InnerHeader, IssueList } from "../../components";
/* == Redux - actions */
import { useSelector, useDispatch }   from 'react-redux';
import { noteActions }                from '../../modules/note';

// * == ( Project MyIssue - Note ) -------------------- * //
const ProjectMyIssue = ({ history, match, ...rest }) => {
  const dispatch = useDispatch();
  const projectId = match.params.projectId;
  useEffect(() => {
    dispatch(noteActions.__getProjectMyIssue(projectId));
  }, []);

  const myNotes = useSelector((state) => state.note.list)

  return (
    <Template>
      <div className="content" id="content">
        <SubHeader />
        <InnerHeader history={history} match={match} projectId={projectId}/>
        <Container>
          <IssueList history={history} notes={myNotes} projectId={projectId} type="projectMyIssue"/>
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

export default ProjectMyIssue;
