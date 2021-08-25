import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { actionCreators as projectActions } from "../../modules/project";
import { history } from "../../modules/configStore";

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
      {props.main ? <IconEdit style={{ cursor: "pointer" }} onClick={leaveProject} /> : <IconProjectEditCss fill="#9A9A9A" onClick={leaveProject} />}
    </div>
  );
};

const IconProjectEditCss = styled(IconProjectEdit)`
cursor: pointer; 
width: 22px; 
height: 22px; 
margin-top: 2px;
&:hover {
  fill:#387E4B;
  animation: spin 7s linear infinite;
    animation-delay: 0;
    @keyframes spin {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
`;
export default LeaveProject;
