import React, { useState } from "react";

/* == Library */
import { NavLink } from "react-router-dom";

/* == Library - bootstrap */
import { Button } from "react-bootstrap";

/* == Custom - Component */
import { WritingNoteModal } from "..";
import { ProjectInvite } from "..";
import MemberToggle from "../modals/MemberToggle";
/* == Custom - Icon */
import { ReactComponent as Write } from "../../styles/images/ico-kanban-write.svg";

// * == ( Note / project menu ) -------------------- * //
const ProjectMenu = ({ history, match, projectId, ...rest }) => {
  /*
   * Function - Modal
   * menuModalVisible : kanban > 노트 작성 모달의 state와 구분
   */
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const openModal = () => {
    setMenuModalVisible(true);
  };
  const closeModal = () => {
    setMenuModalVisible(false);
  };

  return (
    <div className="project-menu">
      {/* project menu */}
      <nav>
        <ul>
          <li>
            <NavLink to={`/projects/${projectId}/issue`} exact activeClassName="project-menu-active">
              전체 문서
            </NavLink>
          </li>
          <li>
            <NavLink to={`/projects/${projectId}/kanban`} exact activeClassName="project-menu-active">
              칸반
            </NavLink>
          </li>
          <li>
            <NavLink to={`/projects/${projectId}/mynote`} exact activeClassName="project-menu-active">
              내가 작성한 문서
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* writing note modal */}
      <div>
        <div style={{ display: "flex" }}>
          <MemberToggle projectId={projectId} />
          <ProjectInvite projectId={projectId} />

          <div>
            <Button
              variant="primary"
              size="sm"
              onClick={openModal}
              style={{
                width: "120px",
                height: "38px",
                background: "#387E4B",
                color: "#FFFFFF",
                border: "1px solid #EDEDED",
                fontWeight: "500",
                fontSize: "15.5px",
                borderRadius: "10px",
              }}
            >
              <Write fill="#FFFFFF" width="14" height="14" style={{ margin: "-2px 8px 0 0" }} />할 일 만들기
            </Button>
            {menuModalVisible && (
              <WritingNoteModal projectId={projectId} visible={menuModalVisible} closable={true} maskClosable={true} onClose={closeModal} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectMenu;
