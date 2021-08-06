import React from "react";
import { useState } from "react";

/* == Library */
import { Link } from "react-router-dom";
import { Container, Button, Collapse, Accordion, Card } from "react-bootstrap";

/* == Library - Icon (react-feather) */
// https://feathericons.com/
import { ChevronDown } from "react-feather";
import { X } from "react-feather";

/* == Custom - Component */
import ProjectModal from "./ProjectModal";
import Modals from "./Modals";

/* == Custom - Icon */
import { ReactComponent as Logo } from "../styles/images/logo.svg";
import LogoImg from "../styles/images/favicon.png";
import { ReactComponent as IconBookMark } from "../styles/images/ico-bookmark.svg";
import { ReactComponent as IconDocument } from "../styles/images/ico-document.svg";
import { ReactComponent as IconProject } from "../styles/images/ico-project.svg";
import { ReactComponent as IconProjectAdd } from "../styles/images/ico-project-add.svg";

// * == (Sidebar) -------------------- * //

const Sidebar = ({ history }) => {
  return (
    <nav className="sidebar">
        {/* == 로고 */}
        <div className="logo-group">
          <Container fluid>
            <Link to="/" className="sidebar-logo">
              <Logo className="logo"/>
              <img src={LogoImg} alt="" className="logo-mobile"/>
              <button id="btn-close-sidebar" className="btn-close-sidebar"><X/></button>
            </Link>
          </Container>
        </div>

        {/* == 메뉴 */}
        <div className="menu-group">
          <Container fluid>
            <ul className="menu">
              <li className="menu-item active">
                <Link to="" className="menu-link">
                  <IconBookMark width="40" height="40" fill="#9A9A9A" className="menu-icon"/> 
                  <span className="menu-text">북마크</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="" className="menu-link">
                  <IconDocument width="40" height="40" fill="#9A9A9A" className="menu-icon"/>
                  <span className="menu-text">내가 작성한 문서</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="" className="menu-link">
                  <IconProjectAdd width="40" height="40" fill="#9A9A9A" className="menu-icon"/>
                  <span className="menu-text">프로젝트 만들기</span>
                </Link>
              </li>
              <li className="menu-item">
                <Accordion defaultActiveKey="0" className="my-project-group">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <IconProject width="40" height="40" fill="#9A9A9A" className="menu-icon"/>
                      <span className="menu-text">내 프로젝트 보기</span></Accordion.Header>
                    <Accordion.Body>
                      <ul className="project-list">
                        <li className="project-item active"><Link to="" className="project-link">프로젝트 1</Link></li>
                        <li className="project-item"><Link to="" className="project-link">프로젝트 2</Link></li>
                        <li className="project-item"><Link to="" className="project-link">프로젝트 3</Link></li>
                        <li className="project-item"><Link to="" className="project-link">프로젝트 4</Link></li>
                        <li className="project-item"><Link to="" className="project-link">프로젝트 5</Link></li>
                        <li className="project-item"><Button variant="primary" size="sm" className="d-block w-100 mt-10"><span className="menu-text">내 프로젝트 더보기</span></Button></li>
                      </ul>
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
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg" className="d-block">프로젝트 초대코드 등록</Button>
            </div>
            {/* <Modals
              buttonTitle="프로젝트 초대코드 등록"
              Title="초대코드를 등록해주세요! "
              Content={<input placeholder="어쩌고 저쩌고"/>}
              Summit="등록"
            /> */}
            <p className="copyright">Copyright 2021 pandaN</p>
          </Container>
        </div>
    </nav>
  );
};

export default Sidebar;
