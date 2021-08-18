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

  const project_detail_list = useSelector((state) => state.project.detailList[0]);

  useEffect(() => {
    dispatch(projectActions.__setDetailProject(projectId));
  }, [dispatch, projectId]);

  if (!project_detail_list) {
    return <div></div>;
  }
  const isUpdatableAndDeletable = project_detail_list.isUpdatableAndDeletable;
  return (
    <ProjectHeaderWrap>
      <div style={{ display: "absolute" }}>
        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          <div>
            <div style={{ display: "flex", flexWrap: "nowrap" }}>
              <ProjectHeaderTitle
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push(history.push(`/projects/${project_detail_list.projectId}/kanban`));
                }}
              >
                {project_detail_list.title}{" "}
              </ProjectHeaderTitle>
              <div style={{ marginLeft: "10px" }}>
                {isUpdatableAndDeletable ? (
                  <ProjectModalEdit projectId={project_detail_list.projectId} title={project_detail_list.title} detail={project_detail_list.detail} />
                ) : (
                  ""
                )}
              </div>
            </div>
            <ProjectHeaderDetail>{project_detail_list.detail}</ProjectHeaderDetail>
          </div>
        </div>
      </div>
      <ProjectHeaderRight>
        <div>
          <ProjectInvite projectId={project_detail_list.projectId} />
        </div>
        <MemberToggle projectId={project_detail_list.projectId} />
      </ProjectHeaderRight>
    </ProjectHeaderWrap>
  );
};

const ProjectHeaderWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 30px;
  justify-content: space-between;
`;
const ProjectHeaderTitle = styled.p`
  font-weight: 700;
  font-size: 1.5rem;
`;

const ProjectHeaderDetail = styled.p`
  font-weight: 500;
  font-size: 1rem;
`;

const ProjectHeaderRight = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin-top: auto;
`;
export default ProjectHeader;
