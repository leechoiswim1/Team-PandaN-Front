import React, { useEffect } from "react";

/* styled-components 및 rem 변환 모듈 */
import styled, { css } from "styled-components";
import { Button } from "react-bootstrap";

import { AlignRight } from "react-feather";
import { t } from "../../util/remConverter";

import { actionCreators as projectActions } from "../../modules/project";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../modules/configStore";

import ProjectModalEdit from "../modals/ProjectModalEdit";
import ProjectInvite from "../modals/ProjectInvite";
import MemberToggle from "../modals/MemberToggle";

const ProjectHeader = props => {
  // const projectId = props.projectId;

  const projectId = window.location.pathname.split("/")[2];
  console.log(projectId);
  const project_list = useSelector(state => state.project.list);

  const index = project_list.findIndex(
    p => p.projectId === parseInt(projectId),
  );

  if (index == -1) {
    return <div />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        padding: "0 30px",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        <div>
          <div style={{ display: "flex", flexWrap: "nowrap" }}>
            <h3>{project_list[index].title} </h3>
            <div style={{ marginLeft: "10px" }}>
              <ProjectModalEdit
                projectId={projectId}
                title={project_list[index].title}
                detail={project_list[index].detail}
              />
            </div>
          </div>
          <h5>{project_list[index].detail}</h5>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        <div>
          <ProjectInvite projectId={projectId} />
        </div>
        <MemberToggle projectId={projectId} />
      </div>
    </div>
  );
};
export default ProjectHeader;
