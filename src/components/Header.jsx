import React from "react";

/* == Library */
import styled, { css } from "styled-components";
import { t } from "../util/remConverter";
import { Container, Col, Row, InputGroup, 
Form, FormControl, Button, Dropdown, DropdownButton } from "react-bootstrap";

/* == Library - Icon (react-feather) */
// https://feathericons.com/?query=logout
import { AlignRight } from "react-feather";
import { LogOut } from "react-feather";

/* == Custom - Component */
import { Modals, EditorModal } from "./";

/* == Custom - Icon */
import { ReactComponent as IconSearch } from "../styles/images/ico-search.svg";
import { ReactComponent as IconMemberAdd } from "../styles/images/ico-member-add.svg";
import { ReactComponent as IconProfile } from "../styles/images/ico-profile.svg";

// * == (Header) -------------------- * //

const Header = ({ history }) => {
  return (
    <header className="header" id="header">
      <Container fluid>
        <Row>
          <Col lg={2}>
            {/* == 햄버거 메뉴 */}
            <Button><AlignRight /></Button>
          </Col>
          <Col lg={10} className="d-inline-flex justify-content-end">
            {/* == 검색창 */}
            <div className="search-group">
              <InputGroup className="mb-3">
                <select className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
                <FormControl placeholder="검색어를 입력하세요" />
                {/* <Button variant="parimary"><img src={IconSearch} /></Button> */}
                <button>
                  <IconSearch width="40" height="40" fill="#767676" />
                </button>
              </InputGroup>
            </div>

            {/* == 멤버 추가 */}
            <button><IconMemberAdd width="40" height="40" fill="#767676" /></button>

            {/* == 유저프로필 */}
            <button><IconProfile width="40" height="40" fill="#767676" /></button>

            {/* == 로그아웃 */}
            <button><LogOut /></button>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
