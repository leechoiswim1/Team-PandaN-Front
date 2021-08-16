import React, { useEffect } from "react";

/* == Library */
import styled, { css } from "styled-components";
import { t } from "../util/remConverter";
import { Container, Col, Row, InputGroup, Form, FormControl, Button, Dropdown, DropdownButton } from "react-bootstrap";

/* == Library - Icon (react-feather) */
// https://feathericons.com/
import { AlignRight } from "react-feather";

/* == Custom - Component */

/* == Redux - actions */
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../modules/user";

// * == (Header) -------------------- * //
const Header = ({ history }) => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(userActions.__logout());
  };

  useEffect(() => {
    dispatch(userActions.__getUserDetail());
    dispatch(userActions.__setLogin());
  }, []);

  const user = useSelector((state) => state.user);
  const userImage =
    user.picture == null
      ? "https://e7.pngegg.com/pngimages/287/501/png-clipart-giant-panda-emoji-coloring-book-drawing-sticker-emoji-child-face-thumbnail.png"
      : user.picture;
  return (
    <header className="header" id="header">
      <Container fluid>
        <Row>
          <Col>
            {/* == 햄버거 메뉴 */}
            <Button id="btn-hamburger">
              <AlignRight />
            </Button>
          </Col>
          <Col className="d-inline-flex justify-content-end">
            {/* == 검색창 */}
            {/* <div className="search-group">
              <InputGroup className="mb-3">
                <select className="form-control">
                  <option>전체</option>
                  <option>게시글 제목</option>
                  <option>게시글 상태</option>
                </select>
                <FormControl placeholder="검색어를 입력하세요"/>
                <button>
                  <IconSearch width="40" height="40" fill="#767676"/>
                </button>
              </InputGroup>
            </div> */}

            {/* == 멤버 추가 */}
            {/* <button><IconMemberAdd width="40" height="40" fill="#767676"/></button> */}

            {/* == 유저프로필 */}
            {/* <button><IconProfile width="40" height="40" fill="#767676" /></button> */}
            <Dropdown>
              <Dropdown.Toggle variant="success" align="end">
                <img src={userImage} alt="profileImage" style={{ width: "35px", height: "35px" }} className="dropdown-profile" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-group">
                <Dropdown.ItemText className="text-center">
                  <img src={userImage} alt="profileImage" style={{ width: "40px", height: "40px" }} className="dropdown-profile" />
                  <p className="dropdown-name">{user.name}</p>
                  <p className="dropdown-email">{user.email}</p>
                </Dropdown.ItemText>
                <Dropdown.Divider style={{ height: "0" }} />
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

export default Header;
