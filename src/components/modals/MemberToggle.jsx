import React, { useEffect } from "react";

import { Dropdown, DropdownButton } from "react-bootstrap";

import { ProjectInvite } from "..";

import { actionCreators as projectActions } from "../../modules/project";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../modules/configStore";

import { ReactComponent as IconProfile } from "../../styles/images/ico-profile.svg";
import { ReactComponent as IconMemberAdd } from "../../styles/images/ico-member-add.svg";
const MemberToggle = (props) => {
  const dispatch = useDispatch();
  const projectId = props.projectId;
  const projectCrews = useSelector((state) => state.project.projectCrews);
  const user = useSelector((state) => state.user);
  const countCrews = projectCrews.length;
  useEffect(() => {
    dispatch(projectActions.__checkProjectCrews(projectId));
  }, [dispatch, projectId]);

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" align="end">
          멤버{countCrews}명
        </Dropdown.Toggle>

        <Dropdown.Menu
          className="dropdown-group"
          style={{
            width: "220px",
            minHeight: "360px",
          }}
        >
          <Dropdown.ItemText className="text-center" style={{ display: "flex", flexWrap: "nowrap", minHeight: "30px" }}>
            <IconProfile style={{ width: "40", height: "40" }} fill="#9A9A9A" className="dropdown-profile" />
            <div style={{ margin: "auto 10px", textAlign: "left" }}>
              <p className="dropdown-name">{user.name}</p>
              <p
                className="dropdown-email"
                style={{
                  width: "120px",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {user.email}
              </p>
            </div>
          </Dropdown.ItemText>
          <Dropdown.Divider style={{ height: "0" }} />

          <div style={{ minHeight: "300px" }}>
            <Dropdown.ItemText>멤버({countCrews})</Dropdown.ItemText>
            <Dropdown.ItemText>
              {countCrews > 1 ? (
                projectCrews.map((c, idx) => {
                  return <div key={idx}>{c.userName}</div>;
                })
              ) : (
                <div
                  style={{
                    marginTop: "40px",
                    minheight: "250px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    alignItem: "center",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <IconMemberAdd style={{ width: "80", height: "80", marginBottom: "20px" }} fill="#9A9A9A" className="menu-icon" />
                  </div>
                  <div style={{ fontSize: "15px" }}>
                    <p>멤버가 없습니다.👀 </p>
                    <p>멤버를 초대하여 함께 </p>
                    <p>협업공간을 진행해보세요!</p>
                  </div>
                </div>
              )}
            </Dropdown.ItemText>
          </div>

          <Dropdown.Divider style={{ height: "0" }} />
          <Dropdown.ItemText
            style={{
              minHeight: "30px",
              textAlign: "center",
              verticalAlign: "middle",
              alignItem: "center",
              justifyContent: "center",
              display: "flex",
              lineHeight: "5vh",
            }}
          >
            <p>로그아웃</p>
          </Dropdown.ItemText>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default MemberToggle;
