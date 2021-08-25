import React, { useEffect, useState } from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
/* == Custom - Component */
import { Template, ProjectHeader, ProjectMenu, IssueList, EmptyBoard } from "../../components";
import { Paging } from "../../components";
/* == Redux - actions */
import { useSelector, useDispatch } from "react-redux";
import { noteActions } from "../../modules/note";

// * == ( Project Issue - Note ) -------------------- * //
const ProjectIssue = ({ history, match, ...rest }) => {
  const dispatch = useDispatch();
  const issueNotes = useSelector((state) => state.note.projectIssue);
  const projectId = match.params.projectId;
  const isLoading = useSelector((state) => state.note.is_loading);
  const paging = useSelector((state) => state.note.issuePaging);

  useEffect(() => {
    dispatch(noteActions.__getProjectIssue(projectId, paging.pageNumber, paging.size));
  }, []);

  return (
    <Template match={match}>
      <div className="content" id="content">
        <ProjectHeader match={match} />
        <ProjectMenu history={history} match={match} projectId={projectId} />
        <div className="note-board-container" style={{ height: "90%" }}>
          <p style={{ fontWeight: "500" }}>
            총 <span style={{ color: "#387E4B", fontWeight: "700", fontSize: "16px" }}>{paging.totalElements}</span>개
          </p>
          <div style={{ height: "90%" }}>
            {issueNotes && <IssueList history={history} notes={issueNotes} projectId={projectId} type="projectIssue" />}
            {issueNotes.length === 0 && <EmptyBoard type="projectIssue" />}
          </div>
          <div style={{ height: "10%" }}>
            <Paging paging={paging} module={noteActions.__getProjectIssue} projectId={projectId} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </Template>
  );
};

export default ProjectIssue;
