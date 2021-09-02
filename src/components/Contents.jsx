import React from "react";

/* == Custom - Component */
import { KanbanList, ProjectCardList } from "./";

/* == Redux - actions */
import { useSelector } from "react-redux";

const Contents = (props) => {
  const project_list = useSelector((state) => state.project.list);
  return <div>{project_list.length > 0 ? <KanbanList /> : <ProjectCardList />}</div>;
};

export default Contents;
