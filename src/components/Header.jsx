import React, { useEffect, useState } from "react";

/* == Library */
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { t } from "../util/remConverter";
import { Container, Col, Row, Button, Dropdown, InputGroup, FormControl } from "react-bootstrap";

/* == Library - Icon (react-feather) */
// https://feathericons.com/
import { ChevronDown } from "react-feather";

/* == Custom - Icon */
import { ReactComponent as Logo } from "../styles/images/logo-white.svg";
import { ReactComponent as IconSearch } from "../styles/images/ico-search.svg";

/* == Custom - Image */
import { ReactComponent as IconProfile } from "../styles/images/ico-profile.svg";

/* == Redux - actions */
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../modules/user";
import { searchActions } from "../modules/search";
import { history } from "../modules/configStore";
import { useParams } from "react-router-dom";

// * == (Header) -------------------- * //

const Header = (props) => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(userActions.__logout());
  };

  const user = useSelector((state) => state.user);
  const { category, q } = useParams();
  const [keyword, setKeyword] = useState(q);

  const [searchFilter, setSearchFilter] = useState("all");

  //
  // * == (검색) 유효성 검사 및 검색결과 페이지 이동
  // -------------------------------
  const searchfunction = () => {
    if (keyword === undefined) {
      // case 1. 검색어를 입력하지 않았을 경우
      alert(" 검색어를 입력하세요!");
      return;
    } else if (keyword === "" && searchFilter === "bookmark") {
      // case 2. 북마크에 검색어를 입력하지않았을 경우
      alert("검색어를 입력하세요!");
      return;
    } else if (keyword === "" && searchFilter === "mynote") {
      // case 3. mynote에검색어를 입력하지않았을 경우
      alert("검색어를 입력하세요!");
      return;
    } else if (keyword === "" && searchFilter === "all") {
      // case 3. All에검색어를 입력하지않았을 경우
      alert("검색어를 입력하세요!");
      return;
    }
    // 검색결과 페이지로 이동
    history.push(`/search/${searchFilter}/${keyword}`);
  };

  //
  // * == (검색) 키보드 엔터 이벤트 => 유효성 함수(searchfunction) 실행
  // -------------------------------
  const EnterSummit = (e) => {
    if (e.key === "Enter") {
      searchfunction();
    }
  };

  //
  // * == (검색) Bootstrap Collapse
  // -------------------------------
  const [open, setOpen] = useState(false);
  //
  // * == (프로필) 사용자 프로필 기본 이미지
  // -------------------------------
  const userImage = user.picture == "http://52.78.204.238/image/profileDefaultImg.jpg" ? <IconProfile /> : user.picture;

  return (
    <header className="header" id="header">
      <Container fluid>
        <Row>
          <Col className="header-right">
            <Link to="/" className="sidebar-logo">
              {/* <Logo className="logo" /> */}
            </Link>

            {/* == 검색창 */}
            <div className="search-group">
              <InputGroup>
                <div className="search-select-group">
                  <select className="search-select-box" defaultValue={category && category} onChange={(e) => setSearchFilter(e.target.value)}>
                    <option value="all">전체</option>
                    <option value="bookmark">북마크 검색</option>
                    <option value="mynote">내가 작성한 문서 검색</option>
                  </select>
                </div>

                <FormControl
                  type="text"
                  placeholder="검색어를 입력하세요"
                  defaultValue={q && q}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyPress={EnterSummit}
                />
                <button className="btn-search" onClick={searchfunction}>
                  <IconSearch width="24" height="24" fill="#767676" />
                </button>
              </InputGroup>
            </div>

            <Dropdown>
              {/* == 모바일 검색보 버튼 */}
              <Dropdown.Toggle className="btn-search-mobile" variant="">
                <IconSearch width="24" height="24" fill="#767676" className="ico-search" />
              </Dropdown.Toggle>
              {/* == 검색창 */}
              <Dropdown.Menu className="search-group-mobile">
                <InputGroup>
                  <div className="search-select-group">
                    <select className="search-select-box" defaultValue={category && category} onChange={(e) => setSearchFilter(e.target.value)}>
                      <option value="all">전체</option>
                      <option value="bookmark">북마크 검색</option>
                      <option value="mynote">내가 작성한 문서 검색</option>
                    </select>
                  </div>

                  <FormControl
                    type="text"
                    placeholder="검색어를 입력하세요"
                    defaultValue={q && q}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyPress={EnterSummit}
                  />
                  <button className="btn-search" onClick={searchfunction}>
                    <IconSearch width="24" height="24" fill="#767676" />
                  </button>
                </InputGroup>
              </Dropdown.Menu>
            </Dropdown>

            {/* == 유저프로필 */}
            <Dropdown className="header-dropdown">
              <Dropdown.Toggle variant="" align="end">
                <img src={userImage} alt="profileImage" className="dropdown-profile" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-group">
                <Dropdown.ItemText className="text-center">
                  <img
                    src={userImage}
                    alt="profileImage"
                    style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                    className="dropdown-profile"
                  />
                  <p className="dropdown-name">{user.name}</p>
                  <p className="dropdown-email">{user.email}</p>
                </Dropdown.ItemText>
                <Dropdown.Divider style={{ borderTop: "0" }} />
                <Dropdown.ItemText>
                  {/* == 로그아웃 */}
                  <Button variant="primary" size="sm" className="d-block w-100" onClick={logout}>
                    로그아웃
                  </Button>
                </Dropdown.ItemText>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

// const DropdownDivider = styled.hr`
//   width: 90%;
//   height: 1px;
//   background: #ededed;
//   @media (max-width: 400px) {
//     width: 100%;
//   }
// `;

export default Header;
