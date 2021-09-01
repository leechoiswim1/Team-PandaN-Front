import React, { useEffect } from "react";

/* styled-components 및 rem 변환 모듈 */
import styled from "styled-components";
import { t } from "../../util/remConverter";

import { actionCreators as projectActions } from "../../modules/project";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../modules/configStore";

import { ProjectModalEdit, ProjectInvite, ModalWriting, LeaveProject, MemberDropBox } from "..";

const ProjectHeader = React.memo(({ match }) => {
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
      <Left>
        <ProjectTitleWrap>
          <ProjectHeaderTitle
            onClick={() => {
              history.push(history.push(`/projects/${project_detail_list.projectId}/kanban`));
            }}
          >
            {project_detail_list.title}{" "}
          </ProjectHeaderTitle>
          <ProjectEditIcon>
            {isUpdatableAndDeletable ? (
              <ProjectModalEdit projectId={project_detail_list.projectId} title={project_detail_list.title} detail={project_detail_list.detail} />
            ) : (
              <LeaveProject projectId={project_detail_list.projectId} />
            )}
          </ProjectEditIcon>
        </ProjectTitleWrap>
        <ProjectDetailWrap>
          <ProjectHeaderDetail>{project_detail_list.detail}</ProjectHeaderDetail>
        </ProjectDetailWrap>
      </Left>
      <Right>
        <MemberDropBox projectId={projectId} />
        <ProjectInvite projectId={projectId} />
        {/* writing note modal */}
        <ModalWriting history={history} projectId={projectId} modalType="projectMenu" />
      </Right>
    </ProjectHeaderWrap>
  );
});

const ProjectHeaderWrap = styled.div`
  padding: 1rem 1.875rem;
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;

    padding: 0.5rem 1.875rem;
  }
`;

const ProjectEditIcon = styled.div`
  margin: 3px 0px 0px 10px;
  @media (max-width: 768px) {
  }
`;

const Left = styled.div`
  float: left;
`;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 768px) {
    width: 100%;

    float: right;
    margin-left: auto;
  }
`;
const ProjectTitleWrap = styled.div`
  display: flex;
  vertical-align: middle;
  @media (max-width: 768px) {
    justify-content: space-between;
    width: 100%;
    margin: auto;
    align-items: center;
  }
`;
const ProjectHeaderTitle = styled.p`
  font-weight: bold;
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 4px;
  letter-spacing: -0.03rem;
  cursor: pointer;
  color: #191919;
  &:hover {
    color: #387e4b;
  }
  @media (max-width: 900px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: 768px) {
    margin-bottom: 8px;
    font-size: 16px;
    line-height: 24px;
  }
`;
const ProjectDetailWrap = styled.div`
  display: flex;
  vertical-align: middle;
  @media (max-width: 768px) {
    justify-content: space-between;
    width: 100%;
    margin: auto;
  }
  @media (max-width: 450px) {
    justify-content: space-between;
    width: 100%;
    margin: auto;
  }
`;
const ProjectHeaderDetail = styled.p`
  font-weight: 400;
  color: #191919;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.03em;

  @media (max-width: 900px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: 768px) {
    margin-bottom: 8px;
    font-size: 12px;
    line-height: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default ProjectHeader;
