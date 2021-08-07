import React from "react";
import styled, { css } from "styled-components";
import { t } from "../../util/remConverter";
import { useSelector } from "react-redux";
import { history } from "../../modules/configStore";

const ProjectCardList = () => {
  const project_list = useSelector(state => state.project.list);
  return (
    <Wrap>
      {project_list.map((p, idx) => {
        return (
          <Item
            style={{ cursor: "pointer" }}
            key={idx}
            onClick={() => {
              history.push(`/projects/${p.projectId}/kanban`);
            }}
          >
            <p>{p.title}</p>
            <p>{p.detail}</p>
          </Item>
        );
      })}
    </Wrap>
  );
};

const Item = styled.div(
  ...t`
  width:30%; 
  height:200px;
  margin: 10px auto;
  padding: 10px;
  background-color: #fff; 
  overflow:hidden;
`,
);

const Wrap = styled.div(
  ...t`
  width:100%;
  height:auto;
  overflow:hidden;
  margin:auto;
  padding:10px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
`,
);
export default ProjectCardList;
