import React, { useEffect } from "react";
/* styled-components 및 rem 변환 모듈 */
import styled, { css } from "styled-components";
import { AlignRight } from "react-feather";
import { t } from "../util/remConverter";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as projectActions } from "../modules/project";
import { history } from "../modules/configStore";

const ProjectHeader = props => {
  const dispatch = useDispatch();
  const project_list = useSelector(state => state.project.list);
  console.log(props);
  const id = window.location.pathname.split("/projects/")[1];
  console.log(id);

  const index = project_list.findIndex(p => p.projectId === parseInt(id));

  const deleteProject = () => {
    if (window.confirm("정말로 프로젝트를 지우시겠습니까?😲") === true) {
      dispatch(projectActions.__deleteProject(id));
      history.push("/");
    } else {
      return;
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", paddingLeft: "20px" }}>
      <div>
        <h3>프로젝트 이름 : {project_list[index].title} </h3>
        <h6>프로젝트 설명 : {project_list[index].detail}</h6>
      </div>
      <div>
        <Button
          onClick={() => {
            deleteProject();
          }}
        >
          삭제
        </Button>
      </div>
      <div>
        <Button
          onClick={() => {
            // dispatch(projectActions.__editProject(id))
          }}
        >
          수정
        </Button>
      </div>
    </div>
  );
};
export default ProjectHeader;
