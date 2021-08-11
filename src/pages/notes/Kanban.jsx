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
  useEffect(() => {
    const projectId = match.params.projectId;
    dispatch(projectActions.__setDetailProject(projectId));
  }, [dispatch, match.params.projectId]);

  useEffect(() => {
    const projectId = match.params.projectId;
    dispatch(noteActions.__getKanbanNotes(projectId));
  }, [dispatch, match.params.projectId]);

  useEffect(() => {
    dispatch(projectActions.__setProject());
  }, []);

  const project_detail_list = useSelector((state) => state.project.detailList[0]);
  console.log(project_detail_list);
  if (!project_detail_list) {
    return <div />;
  }
  return (
    <Template>
      <main className="content" id="content">
        <ProjectHeader project_detail_list={project_detail_list} />
        <InnerHeader history={history} match={match} projectId={projectId} />
        <div className="note-container">
          <KanbanBoard history={history} />
        </div>
      </main>
    </Template>
  );
};

export default Kanban;
