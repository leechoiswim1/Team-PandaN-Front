import { React, useState } from "react";
import Modals from "../modals/Modals";
import { useDispatch } from "react-redux";
import { actionCreators as projectActions } from "../../modules/project";

const ProjectJoin = () => {
  const dispatch = useDispatch();
  const [InviteCode, setInviteCode] = useState("");
  const [show, setShow] = useState(false);
  const inviteCode = { inviteCode: InviteCode };
  const JoinProject = () => {
    if (InviteCode === "") {
      window.alert("초대 코드를 입력해주세요!");
      return;
    }
    dispatch(projectActions.__joinProject(inviteCode));
    setShow(false);
  };

  const changeInviteCode = e => {
    setInviteCode(e.target.value);
  };
  return (
    <div>
      <Modals
        buttonTitle="프로젝트 초대코드 등록"
        Title="초대코드를 등록해주세요! "
        Content={
          <input
            style={{ margin: "20px 50px", width: "80%" }}
            placeholder="초대코드"
            onChange={changeInviteCode}
          />
        }
        Clicked={JoinProject}
        Summit="코드등록"
      />
    </div>
  );
};

export default ProjectJoin;
