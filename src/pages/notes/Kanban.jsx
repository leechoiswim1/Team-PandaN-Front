import React, { useEffect, useState } from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
/* == Custom - Component */
import { Template, ProjectHeader, InnerHeader, KanbanBoard } from "../../components";
/* == Redux - actions */
import { useSelector, useDispatch } from "react-redux";
import { noteActions } from "../../modules/note";
import { actionCreators as projectActions } from "../../modules/project";

// * == ( note - Kanban ) -------------------- * //
const Kanban = ({ history, match, ...rest }) => {
  const dispatch = useDispatch();
  const projectId = match.params.projectId;
  console.log(projectId);

  useEffect(() => {
    dispatch(projectActions.__setProject());
  }, []);
  useEffect(() => {
    const projectId = match.params.projectId;
    dispatch(noteActions.__getKanbanNotes(projectId));
  }, [projectId]);

  const project_detail_list = useSelector((state) => state.project.detailList[0]);

  if (!project_detail_list) {
    return <div />;
  }
  return (
    <Template>
      <main className="content" id="content">
        <ProjectHeader match={match} />
        <InnerHeader history={history} match={match} projectId={projectId} />
        <div className="note-container">
          <KanbanBoard history={history} match={match} />
        </div>
      </main>
    </Template>
  );
};

export default Kanban;
