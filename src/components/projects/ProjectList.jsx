import React, { useEffect } from "react";

import { Button } from "react-bootstrap";

import { actionCreators as projectActions } from "../../modules/project";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../modules/configStore";

const ProjectList = () => {
  const project_side_list = useSelector((state) => state.project.sideList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(projectActions.__setSideProject());
  }, []);
  return (
    <>
      {project_side_list.map((p, idx) => {
        return (
          <div
            style={{ cursor: "pointer" }}
            key={idx}
            onClick={() => {
              history.push(`/projects/${p.projectId}/kanban`);
            }}
          >
            {p.title}
          </div>
        );
      })}
      <Button
        variant="primary"
        size="sm"
        className="d-block w-100 mt-10"
        onClick={() => {
          history.push("/");
        }}
      >
        <span className="menu-text">내 프로젝트 더보기</span>
      </Button>
    </>
  );
};

export default ProjectList;
