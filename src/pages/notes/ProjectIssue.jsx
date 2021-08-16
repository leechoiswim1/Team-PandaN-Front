import React, { useEffect, useState } from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
/* == Custom - Component */
import { Template, ProjectHeader, ProjectMenu, IssueList, EmptyBoard } from "../../components";
/* == Redux - actions */
import { useSelector, useDispatch } from "react-redux";
import { noteActions } from "../../modules/note";

// * == ( Project Issue - Note ) -------------------- * //
const ProjectIssue = ({ history, match, ...rest }) => {
  const dispatch = useDispatch();
  const projectId = match.params.projectId;
  useEffect(() => {
    dispatch(noteActions.__getProjectIssue(projectId));
  }, []);

  const issueNotes = useSelector((state) => state.note.list);
  return (
    <Template>
      <div className="content" id="content">
        <ProjectHeader match={match} />
        <ProjectMenu history={history} match={match} projectId={projectId} />
        <div className="note-board-container">
          { issueNotes && <IssueList history={history} notes={issueNotes} projectId={projectId} type="projectIssue" /> }
          { issueNotes.length === 0 && <EmptyBoard type="projectIssue"/> }
        </div>
      </div>
    </Template>
  );
};


export default ProjectIssue;
