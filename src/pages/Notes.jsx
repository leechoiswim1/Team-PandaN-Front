import React from "react";
import Template from "../components/Template";
import { KanbanList } from "../components";
const Projects = ({ history }) => {
  return (
    <React.Fragment>
      <Template />
      <KanbanList />
    </React.Fragment>
  );
};

export default Projects;
