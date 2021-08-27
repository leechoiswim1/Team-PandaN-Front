import React, { useEffect, useState, useRef } from "react";

/* == Library - style */
import styled from "styled-components";

import { actionCreators as projectActions } from "../../modules/project";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as IconMemberAdd } from "../../styles/images/icon_AddMember2.svg";

const MemberDropBox = (props) => {
  const dispatch = useDispatch();
  const projectId = props.projectId;
  const projectCrews = useSelector((state) => state.project.projectCrews);
  const user = useSelector((state) => state.user);
  const countCrews = projectCrews.length;

  const el = useRef(null);
  const [show, setShow] = useState(false);
  const handleClose = (e) => {
    if (el.current && !el.current.contains(e.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, []);

  useEffect(() => {
    dispatch(projectActions.__checkProjectCrews(projectId));
  }, [dispatch, projectId]);

  return (
    <div class="dropdown">
      <button
        ref={el}
        class="dropbtn"
        onClick={() => {
          setShow(!show);
        }}
      >
        <IconMemberAdd fill="#767676" class="dropbtnSvg" style={{ marginRight: "5px" }} />
        <p>멤버 {countCrews}명</p>
      </button>
      {show ? (
        <div class="dropdown-content">
          <DropdownHeader>
            <img src={user.picture} style={{ width: "40px", height: "40px", borderRadius: "20px" }} alt={user.picture} />
            <div style={{ margin: "auto 10px", textAlign: "left" }}>
              <p style={{ color: "#191919", fontWeight: "400", fontSize: "16px" }}>{user.name}</p>
            </div>
          </DropdownHeader>
          <hr style={{ width: "90%", margin: "5px auto", border: "1px solid #E4E4E4" }} />
          <DropdownBody>
            <p style={{ color: "#767676", fontWeight: "400", fontSize: "14px", margin: "10px auto" }}>멤버({countCrews})</p>
            <CrewBox>
              <div>
                {countCrews > 1 ? (
                  projectCrews.map((c, idx) => {
                    return (
                      <div key={idx}>
                        <div style={{ display: "flex", margin: "8px 0px" }}>
                          <img src={c.userPicture} alt="crewProfile" style={{ width: "30px", height: "30px", borderRadius: "15px" }} />
                          <p style={{ marginLeft: "10px", lineHeight: "30px", color: "#191919", fontWeight: "400", fontSize: "14px" }}>
                            {c.userName}
                          </p>
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
              </div>
            </CrewBox>
          </DropdownBody>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const DropdownHeader = styled.div`
  display: flex;
  height: 20%;
  width: 88%;
  padding: 16px 0px;
  margin: auto;
`;

const DropdownBody = styled.div`
  height: 80%;
  width: 88%;
  margin: auto;
  padding: auto;
`;

const CrewBox = styled.div`
  min-height: 100px;
  max-height: 250px;
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

export default MemberDropBox;
