import React from "react";
import Template from "../components/Template";

/* components */
import { KanbanList, SubHeader } from "../components";

const NoteKanban = ({ history }) => {
  return (
    <React.Fragment>
      {/* <Template /> */}
      <SubHeader />
      <KanbanList />
    </React.Fragment>
  );
};

export default NoteKanban;
