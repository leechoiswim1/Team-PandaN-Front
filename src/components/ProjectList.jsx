import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { actionCreators as projectActions } from "../modules/project";
import { history } from "../modules/configStore";

const ProjectList = () => {
  const project_list = useSelector(state => state.project.list);
  console.log(project_list);

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
        {project_list.map((p, idx) => {
          return (
            <div
              style={{ cursor: "pointer" }}
              key={idx}
              onClick={() => {
                history.push(`/projects/${p.projectId}`);
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
