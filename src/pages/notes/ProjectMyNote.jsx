import React, { useEffect, useState } from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
/* == Custom - Component */
import {
  Template,
  ProjectHeader,
  InnerHeader,
  IssueList,
} from "../../components";
/* == Redux - actions */
import { useSelector, useDispatch } from "react-redux";
import { noteActions } from "../../modules/note";

// * == ( Project MyNote - Note ) -------------------- * //
const ProjectMyNote = ({ history, match, ...rest }) => {
  const dispatch = useDispatch();
  const projectId = match.params.projectId;
  useEffect(() => {
    dispatch(noteActions.__getProjectMyNotes(projectId));
  }, []);

  const myNote = useSelector(state => state.note.list);

  return (
    <Template>
      <div className="content" id="content">
        <ProjectHeader />
        <InnerHeader history={history} match={match} projectId={projectId} />
        <Container>
          <IssueList
            history={history}
            notes={myNote}
            projectId={projectId}
            type="projectMyNote"
          />
        </Container>
      </div>
    </Template>
  );
};

const Container = styled.div(
  ...t`
  width: 100%;
  height: calc( 100% - 120px );
  padding: 0 36px;
  overflow: auto;
`,
);

export default ProjectMyNote;
