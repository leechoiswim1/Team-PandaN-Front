import React, { useEffect } from "react";

import styled from "styled-components";
import { useSelector } from "react-redux";
import { history } from "../../modules/configStore";
import { ReactComponent as Write } from "../../styles/images/ico-kanban-write.svg";
const ProjectList = () => {
  const project_side_list = useSelector((state) => state.project.sideList);

  return (
    <>
      {project_side_list.map((p, idx) => {
        return (
          <ProjectSideList
            key={idx}
            onClick={() => {
              history.push(`/projects/${p.projectId}/kanban`);
            }}
          >
            {p.title}
          </ProjectSideList>
        );
      })}
      <MoreButton
        onClick={() => {
          history.push("/");
        }}
      >
        더보기 +
      </MoreButton>
    </>
  );
};

const ProjectSideList = styled.div`
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  color: #9a9a9a;
  line-height: 24px;
  margin-bottom: 10px;
  &:hover {
    color: #387e4b;
  }
`;
const MoreButton = styled.div`
  width: 100px;
  height: 30px;
  background: #ededed;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: #9a9a9a;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background: #387e4b;
    color: #fff;
  }
`;

export default ProjectList;
