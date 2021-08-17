import React, { useEffect, useState } from "react";

/* == Library */
import styled, { css } from "styled-components";
import { t } from "../util/remConverter";
import { Container, Col, Row, Button, Dropdown, InputGroup, FormControl } from "react-bootstrap";

/* == Library - Icon (react-feather) */
// https://feathericons.com/
import { AlignRight } from "react-feather";

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
    dispatch(userActions.__logout());
  };

  const user = useSelector((state) => state.user);

  const [keyword, setKeyword] = useState("");
  console.log(keyword);

  // const userImage =
  //   user.picture == null
  //     ? "https://e7.pngegg.com/pngimages/287/501/png-clipart-giant-panda-emoji-coloring-book-drawing-sticker-emoji-child-face-thumbnail.png"
  //     : user.picture;
  return (
    <header className="header" id="header">
      <Container fluid>
        <Row>
          <Col className="d-inline-flex justify-content-end">
            {/* == 검색창 */}
            <div className="search-group">
              <InputGroup className="mb-3">
                <select className="form-control">
                  <option>전체</option>
                  <option>북마크 검색</option>
                  <option>내가 작성한 문서 검색</option>
                </select>
                <FormControl placeholder="검색어를 입력하세요" onChange={(e)=> setKeyword(e.target.value)}/>
                <button>
                  <IconSearch width="40" height="40" fill="#767676"/>
                </button>
              </InputGroup>
            </div>

            {/* == 유저프로필 */}
            <Dropdown>
              <Dropdown.Toggle variant="success" align="end">
                <img src={user.picture} alt="profileImage" style={{ width: "35px", height: "35px" }} className="dropdown-profile" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-group">
                <Dropdown.ItemText className="text-center">
                  <img src={user.picture} alt="profileImage" style={{ width: "40px", height: "40px" }} className="dropdown-profile" />
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
