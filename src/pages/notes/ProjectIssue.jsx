import React, { useEffect, useState } from "react";
/* == Library - style */
import styled from "styled-components";
import { t }  from "../../util/remConverter";
/* == Custom - Component */
import { Template, SubHeader, InnerHeader, IssueList } from "../../components";
/* == Redux - actions */
import { useSelector, useDispatch }   from 'react-redux';
import { noteActions }                from '../../modules/note';

// * == ( Project Issue - Note ) -------------------- * //
const ProjectIssue = ({ history, match, ...rest }) => {
  const dispatch = useDispatch();
  const projectId = match.params.projectId;
  useEffect(() => {
    dispatch(noteActions.__getProjectIssueNotes(projectId));
  }, []);

  const issueNotes = useSelector((state) => state.note.list)
  console.log(projectId)
  return (
    <Template>
      <div className="content">
        <SubHeader />
        <InnerHeader history={history} match={match} projectId={projectId}/>
        <Container>
          <IssueList history={history} notes={issueNotes} projectId={projectId} type="projectIssue"/>
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

export default ProjectIssue;
