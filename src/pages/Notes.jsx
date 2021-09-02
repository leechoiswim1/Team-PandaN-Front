import React from "react";

/* == Custom - Component */
import Template from "../components/Template";
import { KanbanList } from "../components";

const Projects = ({ history, match }) => {
  return (
    <React.Fragment>
      <Template match={match} />
      <KanbanList />
    </React.Fragment>
  );
};

export default Projects;
