import React, { useEffect } from "react";

/* == Library */
import styled, { css } from "styled-components";
import { t } from "../util/remConverter";
import { Container, Col, Row, InputGroup, Form, FormControl, Button, Dropdown, DropdownButton } from "react-bootstrap";

/* == Library - Icon (react-feather) */
// https://feathericons.com/
import { AlignRight } from "react-feather";

/* == Custom - Component */
import MyProfile from "./modals/MyProfile";

/* == Custom - Icon */
import { ReactComponent as IconSearch } from "../styles/images/ico-search.svg";
import { ReactComponent as IconMemberAdd } from "../styles/images/ico-member-add.svg";
import { ReactComponent as IconProfile } from "../styles/images/ico-profile.svg";

/* == Redux - actions */
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../modules/user";

// * == (Header) -------------------- * //
const Header = ({ history }) => {
  const dispatch = useDispatch();
  const logout = () => {
    // dispatch(userActions.__logout());
  };

  useEffect(() => {
    dispatch(userActions.__getUserDetail());
  }, []);

  const user = useSelector((state) => state.user);

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
            <MyProfile />
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
                <IconProfile width="35" height="35" fill="#ffffff" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-group">
                <Dropdown.ItemText className="text-center">
                  <IconProfile width="40" height="40" fill="#ffffff" className="dropdown-profile" />
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
