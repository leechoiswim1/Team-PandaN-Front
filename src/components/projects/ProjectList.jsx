import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as projectActions } from "../../modules/project";
import { history } from "../../modules/configStore";

const ProjectList = () => {
  const project_side_list = useSelector(state => state.project.sideList);
  console.log(project_side_list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(projectActions.__setSideProject());
  }, []);
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "150px",
          border: "1px solid #387E4B",
          overflow: "auto",
        }}
      >
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
      </div>
    </>
  );
};

export default ProjectList;
