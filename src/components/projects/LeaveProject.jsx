import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { actionCreators as projectActions } from "../../modules/project";
import { history } from "../../modules/configStore";

import { ReactComponent as LogOut } from "../../styles/images/Icon_LogOut.svg";

const LeaveProject = (props) => {
  const dispatch = useDispatch();
  const id = props.projectId;

  const leaveProject = () => {
    if (window.confirm("프로젝트를 탈퇴하시겠습니까?😲") === true) {
      if (window.confirm("정말로 프로젝트를 탈퇴하시겠습니까?😭") === true) {
        dispatch(projectActions.__leaveProject(id));
        history.push("/");
      } else {
        return;
      }
    } else {
      return;
    }
  };
  return <LogOutSt onClick={leaveProject} />;
};

const LogOutSt = styled(LogOut)`
cursor:pointer;
&:hover {
  stroke:#387E4B;
`;

export default LeaveProject;
