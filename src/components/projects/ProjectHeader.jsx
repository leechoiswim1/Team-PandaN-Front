import React, { useEffect } from "react";

/* styled-components 및 rem 변환 모듈 */
import styled from "styled-components";

import { actionCreators as projectActions } from "../../modules/project";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../modules/configStore";

import { ProjectModalEdit, ProjectInvite, ModalWriting, LeaveProject, MemberDropBox } from "..";

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
      <Left>
        <ProjectTitleWrap>
          <ProjectHeaderTitle
            onClick={() => {
              history.push(history.push(`/projects/${project_detail_list.projectId}/kanban`));
            }}
          >
            {project_detail_list.title}{" "}
          </ProjectHeaderTitle>
          <div style={{ margin: "4px 0px 0px 10px" }}>
            {isUpdatableAndDeletable ? (
              <ProjectModalEdit projectId={project_detail_list.projectId} title={project_detail_list.title} detail={project_detail_list.detail} />
            ) : (
              <LeaveProject projectId={project_detail_list.projectId} />
            )}
          </div>
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
};

const ProjectHeaderWrap = styled.div`
  padding: 10px 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: auto;
    padding: 10px 20px;
  }
`;

const Left = styled.div`
  float: left;
`;

const Right = styled.div`
  display: flex;
  @media (max-width: 768px) {
    width:100%
    margin: auto;
    float:right;
    margin-left: auto;
  }
`;
const ProjectTitleWrap = styled.div`
  display: flex;
  @media (max-width: 768px) {
    justify-content: space-between;
    width: 100%;
    margin: auto;
  }
  &svg {
  }
`;
const ProjectHeaderTitle = styled.p`
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
  color: #191919;
  &:hover {
    color: #387e4b;
  }
  @media (max-width: 900px) {
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;
const ProjectDetailWrap = styled.div`
  display: flex;
  @media (max-width: 768px) {
    justify-content: space-between;
    width: 100%;
    margin: auto;
  }
`;
const ProjectHeaderDetail = styled.p`
  font-weight: 400;
  color: #191919;
  font-size: 16px;
  line-height: 24px;
  @media (max-width: 900px) {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: 768px) {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default ProjectHeader;
