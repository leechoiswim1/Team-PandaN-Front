import React from "react";

import styled, { css } from "styled-components";
import { t } from "../../util/remConverter";

import { useSelector } from "react-redux";
import { history } from "../../modules/configStore";

const ProjectCardList = () => {
  const project_list = useSelector((state) => state.project.list);
  return (
    <>
      <p style={{ margin: "20px 35px", fontSize: "20px", fontWeight: "700" }}>전체 프로젝트</p>
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
              <Title>{p.title}</Title>
              <Detail>{p.detail}</Detail>
            </Item>
          );
        })}
      </Wrap>
    </>
  );
};

const Item = styled.div(
  ...t`
   
  width: 400px;
  height:300px;
  margin: 20px;
  padding: 20px;
  background-color: #fff; 
  overflow:hidden;
  box-sizing: border-box;
  border-radius:20px;
  align-content: space-between;
 
  @media (max-width: 1360px) {
    width: 20%;
  }
  @media (max-width: 900px) {
    width: 43%;
  }
  @media (max-width: 720px) {
    width: 90%;
  }
`,
);

const Wrap = styled.div(
  ...t`
  width:100%;
  height:100%;
  overflow:hidden;
  margin:20px 30px ;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  
`,
);

const Title = styled.p(
  ...t`
  font-size:20px;
  font-weight:700;
`,
);

const Detail = styled.p(
  ...t`
  padding:10px 0;
  font-size:15px;
  color: #9A9A9A;
`,
);
export default ProjectCardList;
