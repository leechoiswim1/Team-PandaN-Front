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

/* == Custom - Image */
import { ReactComponent as IconProfile } from "../styles/images/ico-profile.svg";

/* == Redux - actions */
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../modules/user";
import { searchActions } from "../modules/search";
import { history } from "../modules/configStore";

// * == (Header) -------------------- * //

const Header = (props) => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(userActions.__logout());
  };

  const user = useSelector((state) => state.user);

  const [keyword, setKeyword] = useState("");
  console.log(keyword);

  const searchfunction = () => {
    // console.log("hhhhh" + history);
    dispatch(searchActions.__getSearchAll(keyword));
    history.push("/search");
  }

  const searchKeyword = (props.searchKeyword);

  const userImage =
    user.picture == "http://52.78.204.238/image/profileDefaultImg.jpg"
      ? <IconProfile/>
      : user.picture;
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
                <FormControl 
                  placeholder="검색어를 입력하세요"
                  defaultValue={searchKeyword}
                  onChange={(e)=> setKeyword(e.target.value)}
                />
                <button
                  onClick={searchfunction}
                >
                  <IconSearch width="40" height="40" fill="#767676"/>
                </button>
              </InputGroup>
            </div>

            {/* == 유저프로필 */}
            <Dropdown>
              <Dropdown.Toggle variant="" align="end">
                <img src={user.picture} alt="profileImage" style={{ width: "35px", height: "35px", borderRadius: "50%" }} className="dropdown-profile" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-group">
                <Dropdown.ItemText className="text-center">
                  <img src={userImage} alt="profileImage" style={{ width: "40px", height: "40px", borderRadius: "50%" }} className="dropdown-profile" />
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
