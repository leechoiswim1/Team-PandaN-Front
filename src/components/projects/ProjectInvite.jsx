import { React, useEffect } from "react";
import Modals from "../modals/Modals";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as projectActions } from "../../modules/project";
const ProjectInvite = props => {
  const projectId = props.props.projectId;
  const dispatch = useDispatch();
  const inviteCode = useSelector(state => state.project.inviteCode);
  useEffect(() => {
    dispatch(projectActions.__inviteProject(projectId));
  }, []);

  return (
    <div>
      <Modals
        buttonTitle="멤버초대"
        Title="멤버초대"
        Content={inviteCode}
        Close="Close"
      />
    </div>
  );
};

export default ProjectInvite;
