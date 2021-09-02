import React, { useEffect } from "react";

/* == Library - style */
import styled from "styled-components";

/* == Library */
import { Container, Accordion } from "react-bootstrap";

/* == Custom - Component */
import { ProjectList, ProjectModal, ProjectJoin } from ".";

/* == Custom - Icon */
import { ReactComponent as Logo } from "../styles/images/logo.svg";
import { ReactComponent as IconBookMark } from "../styles/images/ico-bookmark.svg";
import { ReactComponent as IconFile } from "../styles/images/ico-file.svg";
import { ReactComponent as IconProject } from "../styles/images/ico-project.svg";
import { ReactComponent as FeedbackArrow } from "../styles/images/Icon_FeedbackArrow.svg";
import { ReactComponent as FeedBackCon } from "../styles/images/Icon_FeedBackCon.svg";

/* == Redux - actions */
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as projectActions } from "../modules/project";
import { Link } from "react-router-dom";

// * == (Sidebar) -------------------- * //

const Sidebar = (props) => {
  const project_side_list = useSelector((state) => state.project.sideList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(projectActions.__setSideProject());
  }, []);
  const NoteActive = props.match.path === "/mynote" ? "menu-item active" : "menu-item";
  const BookActive = props.match.path === "/bookmark" ? "menu-item active" : "menu-item";

  return (
    <nav className="sidebar">
      {/* == 로고 */}
      <div className="logo-group">
        <Container fluid>
          <Link to="/" className="sidebar-logo">
            <Logo className="logo" />
          </Link>
        </Container>
      </div>

      {/* == 메뉴 */}
      <div className="menu-group">
        <Container fluid>
          <ul className="menu">
            <li className={BookActive}>
              <Link to="/bookmark" className="menu-link">
                <IconBookMark className="menu-icon" width="20px" height="20px" />
                <span className="menu-text">북마크</span>
              </Link>
            </li>
            <li className={NoteActive}>
              <Link to="/mynote" className="menu-link">
                <IconFile className="menu-icon" width="20px" height="20px" />
                <span className="menu-text">내가 작성한 문서</span>
              </Link>
            </li>
            <li className="menu-item">
              <div className="menu-link">
                <ProjectModal sidebar="sidebar" />
              </div>
            </li>
            <li className="menu-item">
              <Accordion defaultActiveKey="0" className="my-project-group">
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    {project_side_list.length > 0 ? <IconProject width="40" height="40" fill="#9A9A9A" className="menu-icon" /> : ""}
                    <span className="menu-text">내 프로젝트 보기</span>
                  </Accordion.Header>
                  {project_side_list.length > 0 ? (
                    <Accordion.Body style={{ marginLeft: "18px", paddingTop: "0px" }}>
                      <ProjectList />
                    </Accordion.Body>
                  ) : (
                    ""
                  )}
                </Accordion.Item>
              </Accordion>
            </li>
          </ul>
        </Container>
      </div>

      {/* == 푸터 */}
      <div className="footer" id="footer">
        <Container fluid>
          <div className="d-grid gap-2 button-group">
            <FeedbackBtn onClick={() => window.open("https://forms.gle/F4sTxqyK9pxgQiB18", "_blank")}>
              <FeedBackCon />
              <FeedbackText>
                <span style={{ fontWeight: "700", color: "#387E4B" }}>PandaN</span>피드백하러 가기!
              </FeedbackText>
              {/* <GoFeedback style={{ margin: " 0px 12px" }} /> */}
              <FeedbackArrow style={{ marginTop: "3px" }} />
            </FeedbackBtn>

            <ProjectJoin sidebar="sidebar" />
          </div>
          <A href="https://github.com/Team-PandaN" target="_blank">
            <p className="copyright">
              Copyright 2021
              <span style={{ fontWeight: "bold" }}> PandaN</span>
            </p>
          </A>
        </Container>
      </div>
    </nav>
  );
};

const FeedbackBtn = styled.div`
  width: 240px;
  height: 48px;
  background: #f3f3f3;
  border-radius: 50px;
  justfify-content: space-between;
  padding: 10px 16px;
  margin: 20px 0px -10px 0px;
  cursor: pointer;
  display: flex;
  &:hover {
    background: #e1ede4;
  }
`;

const FeedbackText = styled.p`
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
  margin: auto;
`;

const A = styled.a`
  text-decoration: none;
  p:hover {
    color: #387e4b;
  }
`;
export default Sidebar;
