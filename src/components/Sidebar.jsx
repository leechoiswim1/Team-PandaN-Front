import React from "react";
import { useState } from "react";

/* == Library */
import { Link } from "react-router-dom";
import { Container, Accordion } from "react-bootstrap";

/* == Library - Icon (react-feather) */
// https://feathericons.com/
import { ChevronDown } from "react-feather";
import { X } from "react-feather";

import { history } from "../modules/configStore";

/* == Custom - Component */
import { ProjectList, ProjectModal, ProjectJoin } from ".";

/* == Custom - Icon */
import { ReactComponent as Logo } from "../styles/images/logo.svg";
import LogoImg from "../styles/images/favicon.png";
import { ReactComponent as IconBookMark } from "../styles/images/ico-bookmark.svg";
import { ReactComponent as IconFile } from "../styles/images/ico-file.svg";
import { ReactComponent as IconProject } from "../styles/images/ico-project.svg";

// * == (Sidebar) -------------------- * //

const Sidebar = (props) => {
  return (
    <nav className="sidebar">
      {/* == 로고 */}
      <div className="logo-group">
        <Container fluid>
          <Link to="/" className="sidebar-logo">
            <Logo className="logo" />
            <img src={LogoImg} alt="" className="logo-mobile" />
            <button id="btn-close-sidebar" className="btn-close-sidebar"><X /></button>
          </Link>
        </Container>
      </div>

      {/* == 메뉴 */}
      <div className="menu-group">
        <Container fluid>
          <ul className="menu">
            <li className="menu-item active">
              <Link to="/bookmark" className="menu-link">
                <IconBookMark className="menu-icon" />
                <span className="menu-text">북마크</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/mynote" className="menu-link">
                <IconFile className="menu-icon" />
                <span className="menu-text">내가 작성한 문서</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="" className="menu-link">
                <ProjectModal />
              </Link>
            </li>
            <li className="menu-item">
              <Accordion defaultActiveKey="0" className="my-project-group">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <IconProject className="menu-icon" />
                    <span className="menu-text">내 프로젝트 보기</span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ProjectList />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </li>
          </ul>
        </Container>
      </div>

      {/* == 푸터 */}
      <div className="footer" id="footer">
        <Container fluid>
          <div className="d-grid gap-2" style={{ justifyContent: "center", margin: "auto" }}>
            <ProjectJoin />
          </div>

          <p className="copyright">Copyright 2021 pandaN</p>
        </Container>
      </div>
    </nav>
  );
};

export default Sidebar;
