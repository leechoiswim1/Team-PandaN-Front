import React, { useEffect, useState } from "react";

/* styled-components 및 rem 변환 모듈 */
import styled from "styled-components";
import { Button } from "react-bootstrap";

import { actionCreators as projectActions } from "../../modules/project";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../modules/configStore";

import { ProjectModalEdit, ProjectInvite, WritingNoteModal } from "..";
import MemberToggle from "../modals/MemberToggle";
import { ReactComponent as Write } from "../../styles/images/ico-kanban-write.svg";
const ProjectHeader = ({ match }) => {
  const dispatch = useDispatch();
  const projectId = match.params.projectId;

  const project_detail_list = useSelector((state) => state.project.detailList[0]);

  useEffect(() => {
    dispatch(projectActions.__setDetailProject(projectId));
  }, [dispatch, projectId]);

  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const openModal = () => {
    setMenuModalVisible(true);
  };
  const closeModal = () => {
    setMenuModalVisible(false);
  };
  if (!project_detail_list) {
    return <div></div>;
  }
  const isUpdatableAndDeletable = project_detail_list.isUpdatableAndDeletable;
  return (
    <ProjectHeaderWrap>
      <Left>
        <ProjectTitleWrap>
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
        </ProjectTitleWrap>
        <ProjectHeaderDetail>{project_detail_list.detail}</ProjectHeaderDetail>
      </Left>
      <Right>
        <MemberToggle projectId={projectId} />
        <ProjectInvite projectId={projectId} />

        <Button
          variant="primary"
          size="sm"
          onClick={openModal}
          style={{
            width: "120px",
            height: "38px",
            background: "#387E4B",
            color: "#FFFFFF",
            border: "1px solid #EDEDED",
            fontWeight: "500",
            fontSize: "15.5px",
            borderRadius: "10px",
          }}
        >
          <Write fill="#FFFFFF" width="14" height="14" style={{ margin: "-2px 8px 0 0" }} />할 일 만들기
        </Button>
        {menuModalVisible && (
          <WritingNoteModal projectId={projectId} visible={menuModalVisible} closable={true} maskClosable={true} onClose={closeModal} />
        )}
      </Right>
    </ProjectHeaderWrap>
  );
};

const ProjectHeaderWrap = styled.div`
  padding: 10px 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
    margin: auto;
  }
`;

const Left = styled.div`
  float: left;
`;

const Right = styled.div`
  display: flex;
`;
const ProjectTitleWrap = styled.div`
  display: flex;
  @media (max-width: 900px) {
    justify-content: space-between;
    width: 80%;
  }
`;
const ProjectHeaderTitle = styled.p`
  font-weight: bold;
  font-size: 24px;

  color: #191919;
  @media (max-width: 900px) {
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 70%;
  }
  @media (max-width: 600px) {
    font-size: 18px;
    width: 80%;
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
