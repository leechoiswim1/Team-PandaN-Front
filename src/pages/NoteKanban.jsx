import React from "react";
import Template from "../components/Template";

/* components */
import { KanbanList } from "../components";

const NoteKanban = ({ history }) => {
  return (
    <React.Fragment>
      <Template />
      <KanbanList />
    </React.Fragment>
  );
};

export default NoteKanban;
