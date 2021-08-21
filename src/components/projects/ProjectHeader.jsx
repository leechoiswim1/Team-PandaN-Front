import React, { useEffect } from "react";

/* styled-components 및 rem 변환 모듈 */
import styled from "styled-components";

import { actionCreators as projectActions } from "../../modules/project";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../modules/configStore";

import ProjectModalEdit from "../modals/ProjectModalEdit";

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
    </ProjectHeaderWrap>
  );
};

const ProjectHeaderWrap = styled.div`
  margin: 5px 50px;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 600px) {
    margin: 0px 50px 10px 50px;
  }
`;
const ProjectHeaderTitle = styled.p`
  font-weight: bold;
  font-size: 24px;
  line-height: 36px;
  color: #191919;
  @media (max-width: 900px) {
    font-size: 20px;
  }
  @media (max-width: 600px) {
    font-size: 18px;
    width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ProjectHeaderDetail = styled.p`
  font-weight: 400;
  color: #1919196;
  font-size: 16px;
  line-height: 24px;
  @media (max-width: 900px) {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80%;
  }
  @media (max-width: 600px) {
    width: 250px;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default ProjectHeader;
