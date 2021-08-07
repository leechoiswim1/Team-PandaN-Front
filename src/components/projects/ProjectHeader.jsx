import React from "react";

import { useSelector } from "react-redux";
import ProjectInvite from "./ProjectInvite";
import ProjectModalEdit from "../modals/ProjectModalEdit";

const ProjectHeader = props => {
  const project_list = useSelector(state => state.project.list);

  const id = props.projectId;
  const index = project_list.findIndex(p => p.projectId === parseInt(id));

  return (
    <div style={{ display: "flex", flexWrap: "wrap", paddingLeft: "20px" }}>
      <div>
        <h3>프로젝트 이름 : {project_list[index].title} </h3>
        <h6>프로젝트 설명 : {project_list[index].detail}</h6>
      </div>
      <div>
        <ProjectModalEdit
          props={props}
          title={project_list[index].title}
          detail={project_list[index].detail}
        />
      </div>
      <ProjectInvite props={props} />
    </div>
  );
};
export default ProjectHeader;
