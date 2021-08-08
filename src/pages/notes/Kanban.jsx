import React, { useEffect, useState } from "react";
/* == Library - style */
import styled from "styled-components";
import { t }  from "../../util/remConverter";
/* == Custom - Component */
import { Template, SubHeader, InnerHeader, KanbanBoard } from "../../components";
/* == Redux - actions */
import { useSelector, useDispatch }   from 'react-redux';
import { noteActions }                from '../../modules/note';

// * == ( note - Kanban ) -------------------- * //
const Kanban = ({ history, match, ...rest }) => {
  const dispatch = useDispatch();
  
  const projectId = match.params.projectId;
  useEffect(() => {
    dispatch(noteActions.__getKanbanNotes(projectId));
  }, []);
  
  return (
    <Template>
      <main className="content" id="content">
        <SubHeader />
        <InnerHeader history={history} match={match} projectId={projectId}/>
        <div className="note-container">
          <KanbanBoard history={history}/>
        </div>
      </main>
    </Template>
  );
};

export default Kanban;
