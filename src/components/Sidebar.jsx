import React from "react";
import { Link } from "react-router-dom";
import ProjectModal from "./ProjectModal";
import Modals from "./Modals";
import ProjectList from "./ProjectList";
import { Container, Nav } from "react-bootstrap";
import Logo from "../styles/images/logo.svg";
import IconBookMark from "../styles/images/ico-bookmark.svg";
import IconDocument from "../styles/images/ico-document.svg";

const Sidebar = ({ history }) => {
  return (
    <nav className="sidebar" id="sidebar">
      <Container fluid>
        {/* == 로고 */}
        <Link to="/">
          <img alt="Logo" src={Logo} />
        </Link>

        {/* == 메뉴 */}
        <ul className="menu">
          <li>
            <Link to="">
              <img alt="IconBookMark" src={IconBookMark} />
              북마크
            </Link>
          </li>
          <li>
            <Link to="">
              <img alt="IconDocument" src={IconDocument} />
              내가 작성한 문서
            </Link>
          </li>
          <li>
            <ProjectModal />
          </li>
          <li>
            <Link to="">
              <img alt="IconDocument" src={IconDocument} />
              프로젝트
            </Link>
          </li>
        </ul>
        <ProjectList />

        {/* == 푸터 */}
        <div className="footer" id="footer">
          <Modals
            buttonTitle="프로젝트 초대코드 등록"
            Title="초대코드를 등록해주세요! "
            Content={<input placeholder="어쩌고 저쩌고" />}
            Summit="등록"
          />
          {/* <Modals
            buttonTitle="버튼제목"
            Title="타이틀"
            Content="컨텐츠"
            Close="Close"
            Summit="등록"
          />
          <Modals
            buttonTitle="버튼제목"
            Title="타이틀"
            Content="컨텐츠"
            Close="Close"
            Summit="등록"
          /> */}

          <p>Copyright 2021 pandaN</p>
        </div>
      </Container>
    </nav>
  );
};

export default Sidebar;
