import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as projectActions } from "../../modules/project";
import { history } from "../../modules/configStore";

import styled from "styled-components";

import { ReactComponent as IconProjectEdit } from "../../styles/images/icon-project-edit.svg";
import { ReactComponent as IconEdit } from "../../styles/images/icon-comment-edit.svg";

const LeaveProject = (props) => {
  const dispatch = useDispatch();
  const id = props.projectId;

  const leaveProject = () => {
    if (window.confirm("정말로 프로젝트를 나가시겠습니까?😲") === true) {
      dispatch(projectActions.__leaveProject(id));
      history.push("/");
    } else {
      return;
    }
  };
  return (
    <div>
      {props.main ? (
        <IconEdit style={{ cursor: "pointer" }} onClick={leaveProject} />
      ) : (
        <IconProjectEdit style={{ cursor: "pointer", width: "22px", height: "22px", marginTop: "7px" }} onClick={leaveProject} />
      )}
    </div>
  );
};

export default LeaveProject;
