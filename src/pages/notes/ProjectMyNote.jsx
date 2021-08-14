import React, { useEffect, useState } from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
/* == Custom - Component */
import { Template, ProjectHeader, InnerHeader, IssueList, EmptyBoard } from "../../components";
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

  const myNote = useSelector((state) => state.note.list);

  return (
    <Template>
      <div className="content" id="content">
        <ProjectHeader match={match} />
        <InnerHeader history={history} match={match} projectId={projectId} />
        <div className="note-board-container">
          { myNote && <IssueList history={history} notes={myNote} projectId={projectId} type="projectMyNote" /> }
          { myNote.length === 0 && <EmptyBoard type="projectMyNote"/> }          
        </div>
      </div>
    </Template>
  );
};

export default ProjectMyNote;
