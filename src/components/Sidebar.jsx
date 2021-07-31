import React from "react";

/* == Library */
import { Link } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";

/* == Custom - Component */
import ProjectModal from "./ProjectModal";
import Modals from "./Modals";

/* == Custom - Icon */
import { ReactComponent as Logo } from "../styles/images/logo.svg";
import { ReactComponent as IconBookMark } from "../styles/images/ico-bookmark.svg";
import { ReactComponent as IconDocument } from "../styles/images/ico-document.svg";
import { ReactComponent as IconProject } from "../styles/images/ico-project.svg";
import { ReactComponent as IconProjectAdd } from "../styles/images/ico-project-add.svg";

// * == (Sidebar) -------------------- * //

const Sidebar = ({ history }) => {
  return (
    <nav className="sidebar" id="sidebar">
        {/* == 로고 */}
        <div className="logo-group">
          <Container fluid>
            <Link to="/" className="sidebar-logo"><Logo/></Link>
          </Container>
        </div>

        {/* == 메뉴 */}
        <div className="menu-group">
          <Container fluid>
            <ul className="menu">
              <li className="menu-item active">
                <Link to="" className="menu-link">
                  <IconBookMark width="40" height="40" fill="#9A9A9A" className="menu-icon"/>북마크
                </Link>
              </li>
              <li className="menu-item">
                <Link to="" className="menu-link">
                  <IconDocument width="40" height="40" fill="#9A9A9A" className="menu-icon"/>내가 작성한 문서
                </Link>
              </li>
              <li className="menu-item">
                <Link to="" className="menu-link">
                  <IconProjectAdd width="40" height="40" fill="#9A9A9A" className="menu-icon"/>프로젝트 만들기
                </Link>
              </li>
              <li className="menu-item">
                <Link to="" className="menu-link">
                  <IconProject width="40" height="40" fill="#9A9A9A" className="menu-icon"/>프로젝트
                </Link>
              </li>            
            </ul>
          </Container>
        </div>

        {/* == 푸터 */}
        <div className="footer" id="footer">
          <Container fluid>
            <Modals
              buttonTitle="프로젝트 초대코드 등록"
              Title="초대코드를 등록해주세요! "
              Content={<input placeholder="어쩌고 저쩌고"/>}
              Summit="등록"
            />
            <p className="copyright">Copyright 2021 pandaN</p>
          </Container>
        </div>
    </nav>
  );
};

export default Sidebar;
