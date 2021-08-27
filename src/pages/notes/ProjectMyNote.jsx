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

// * == ( Project MyNote - Note ) -------------------- * //
const ProjectMyNote = ({ history, match, ...rest }) => {
  const dispatch = useDispatch();
  const myNote = useSelector((state) => state.note.projectMyNote);
  const projectId = match.params.projectId;
  const isLoading = useSelector((state) => state.note.is_loading);
  const paging = useSelector((state) => state.note.projectNotePaging);
  const projectTitle = useSelector((state) => state.project.detailList[0]?.title);
  
  useEffect(() => {
    dispatch(noteActions.__getProjectMyNotes(projectId, paging.pageNumber, paging.size));
  }, []);

  return (
    <Template match={match}>
      <div className="content" id="content">
        <ProjectHeader match={match} />
        <ProjectMenu history={history} match={match} projectId={projectId} />
        <div className="note-project-board-container">
          {myNote.length === 0 ? 
            <EmptyBoard type="projectMyNote" /> :
            <>
            <div>
            <IssueList 
              history={history} 
              notes={myNote} 
              projectId={projectId}
              projectTitle={projectTitle} 
              type="projectMyNote" 
              totalElements={paging.totalElements} 
            />
            </div>
            <div style={{ height: "10%", display: "flex", width: "100%", alignItems:"center", justifyContent: "center"}}>
              <Paging paging={paging} module={noteActions.__getProjectMyNotes} isLoading={isLoading} />
            </div>
            </>
          }
        </div>
      </div>
    </Template>
  );
};

export default ProjectMyNote;
