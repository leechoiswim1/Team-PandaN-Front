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

const ProjectHeader = ({ match }) => {
  const dispatch = useDispatch();
  const projectId = match.params.projectId;
  console.log(projectId);

  const project_detail_list = useSelector((state) => state.project.detailList[0]);

  useEffect(() => {
    dispatch(projectActions.__setDetailProject(projectId));
  }, []);
  if (!project_detail_list) {
    return <div></div>;
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
            <h3>{project_detail_list.title} </h3>
            <div style={{ marginLeft: "10px" }}>
              <ProjectModalEdit projectId={project_detail_list.projectId} title={project_detail_list.title} detail={project_detail_list.detail} />
            </div>
          </div>
          <h5>{project_detail_list.detail}</h5>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        <div>
          <ProjectInvite projectId={project_detail_list.projectId} />
        </div>
        <MemberToggle projectId={project_detail_list.projectId} />
      </div>
    </div>
  );
};
export default ProjectHeader;
