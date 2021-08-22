import React, { useState } from "react";

/* == Library */
import { NavLink } from "react-router-dom";

/* == Custom - Component */
import { ProjectInvite, ModalWriting } from "..";
import MemberToggle from "../modals/MemberToggle";

// * == ( Note / project menu ) -------------------- * //
const ProjectMenu = ({ history, match, projectId, ...rest }) => {
  return (
    <div className="project-menu">
      {/* project menu */}
      <nav>
        <ul>
          <li>
            <NavLink to={`/projects/${projectId}/issue`} exact activeClassName="project-menu-active">
              전체 문서
            </NavLink>
          </li>
          <li>
            <NavLink to={`/projects/${projectId}/kanban`} exact activeClassName="project-menu-active">
              칸반
            </NavLink>
          </li>
          <li>
            <NavLink to={`/projects/${projectId}/mynote`} exact activeClassName="project-menu-active">
              내가 작성한 문서
            </NavLink>
          </li>
        </ul>
      </nav>

      
      <div>
        <div style={{ display: "flex" }}>
          <MemberToggle projectId={projectId} />
          <ProjectInvite projectId={projectId} />
          {/* writing note modal */}
          <ModalWriting history={history} projectId={projectId} modalType="projectMenu" />
        </div>
      </div>
    </div>
  );
};

export default ProjectMenu;
