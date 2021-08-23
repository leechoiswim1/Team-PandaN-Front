import React, { useEffect } from "react";

import { Dropdown } from "react-bootstrap";

/* == Library - style */
import styled from "styled-components";

import { actionCreators as projectActions } from "../../modules/project";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as IconMemberAdd } from "../../styles/images/icon_AddMember2.svg";
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
        <CustomDropdown align="end">
          <IconMemberAdd fill="#767676" style={{ marginRight: "5px" }} />
          멤버{countCrews}명
        </CustomDropdown>

        <Dropdown.Menu
          className="dropdown-group"
          style={{
            width: "200px",
            minHeight: "360px",
            borderRadius: "10px",
            boxShadow: "3px 3px 10px 5px rgba(0, 0, 0, 0.1)",
            background: "#F9F9F9",
            border: "2px solid #DEDEDE",
          }}
        >
          <Dropdown.ItemText className="text-center" style={{ display: "flex", flexWrap: "nowrap", minHeight: "30px" }}>
            <img src={user.picture} style={{ width: "40px", height: "40px", borderRadius: "20px" }} />
            <div style={{ margin: "auto 10px", textAlign: "left" }}>
              <p className="dropdown-name" style={{ color: "#191919", fontWeight: "400", fontSize: "16px" }}>
                {user.name}
              </p>
              <p
                className="dropdown-email"
                style={{
                  width: "120px",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  color: "#767676",
                  fontWeight: "400",
                  fontSize: "14px",
                }}
              >
                {user.email}
              </p>
            </div>
          </Dropdown.ItemText>
          <Dropdown.Divider style={{ width: "89%", margin: "10px auto", border: "1px solid #E4E4E4" }} />

          <CrewBox>
            <Dropdown.ItemText style={{ color: "#767676", fontWeight: "400", fontSize: "14px" }}>멤버({countCrews})</Dropdown.ItemText>
            <Dropdown.ItemText>
              {countCrews > 1 ? (
                projectCrews.map((c, idx) => {
                  return (
                    <div key={idx}>
                      <div style={{ display: "flex", margin: "8px 0px" }}>
                        <img src={c.userPicture} alt="crewProfile" style={{ width: "30px", height: "30px", borderRadius: "15px" }} />
                        <p style={{ marginLeft: "10px", lineHeight: "30px", color: "#191919", fontWeight: "400", fontSize: "14px" }}>{c.userName}</p>
                      </div>
                    </div>
                  );
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
                    <p style={{ color: "#767676", fontWeight: "400", fontSize: "14px" }}>멤버가 없습니다! </p>
                    <p style={{ color: "#767676", fontWeight: "400", fontSize: "12px" }}>멤버를 초대하여 함께 </p>
                    <p style={{ color: "#767676", fontWeight: "400", fontSize: "12px" }}>협업공간을 진행해보세요.</p>
                  </div>
                </div>
              )}
            </Dropdown.ItemText>
          </CrewBox>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const CrewBox = styled.div`
  min-height: 100px;
  max-height: 300px;
  overflow: auto;
  margin-bottom: 20px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #dedede;
    border: 2px solid transparent;
    border-top-left-radius: 50px;
    border-bottom-right-radius: 50px;
  }
`;

const CustomDropdown = styled(Dropdown.Toggle)`
  width: 120px;
  height: 38px;
  background: #ededed;
  color: #767676;
  border: none;
  font-weight: 500;
  font-size: 16px;
  border-radius: 10px;
  &:hover {
    background: #e1ede4;
    color: #767676;
  }
  &:toggle {
    background: #e1ede4;
    color: #767676;
  }
`;
export default MemberToggle;
