import React, { useEffect } from "react";

/* == Custom - Component */
import { Template, ProjectHeader, ProjectMenu, KanbanBoard, Spinner } from "../../components";

/* == Redux - actions */
import { useSelector, useDispatch } from "react-redux";
import { noteKanbanActions } from "../../modules/noteKanban";

// * == ( note - Kanban ) -------------------- * //
const Kanban = ({ history, match, ...rest }) => {
  const dispatch = useDispatch();
  const projectId = match.params.projectId;
  const isLoading = useSelector((state) => state.noteKanban.isLoading);
  useEffect(() => {
    dispatch(noteKanbanActions.__getKanbanNotes(projectId));
  }, [projectId]);

  return (
    <Template match={match}>
      <Spinner visible={isLoading} />
      <main className="content" id="content">
        <ProjectHeader match={match} />
        <ProjectMenu history={history} match={match} projectId={projectId} />
        <div className="note-container">
          <KanbanBoard history={history} match={match} />
        </div>
      </main>
    </Template>
  );
};

export default Kanban;
