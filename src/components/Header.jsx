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
import { useParams } from "react-router-dom";

// * == (Header) -------------------- * //

const Header = (props) => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(userActions.__logout());
  };

  const user = useSelector((state) => state.user);
  const {category, q} = useParams();
  const [keyword, setKeyword] = useState(q);
  // console.log("category: " + category, "q: " +q);

  const [searchFilter, setSearchFilter] = useState("");

  // 검색 유효성 검사 및 검색결과 페이지 이동
  const searchfunction = () => {
    if(keyword === undefined && searchFilter === ""){
      // case 1. 검색분류를 선택하지 않고 검색어를 입력하지 않았을 경우 
      alert('검색분류와 검색어를 선택 및 입력하세요!');
      return;
    } else if(keyword !== undefined && searchFilter === ""){
      // case 2. 검색분류를 선택하지 않았을 경우
      alert('검색분류를 선택하세요!');
      return;
    } else if(keyword == undefined && searchFilter !== ""){
      // case 3. 검색어를 입력하지 않았을 경우
      alert('검색어를 입력하세요!');
      return;
    }
    // 검색결과 페이지로 이동
    history.push(`/search/${searchFilter}/${keyword}`);
  }

  console.log("200.keyword: " + keyword);

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
                <select className="form-control"
                defaultValue={category && category}
                  onChange={(e)=> setSearchFilter(e.target.value)}
                >
                  <option value="">선택</option>
                  <option value="all">전체</option>
                  <option value="bookmark">북마크 검색</option>
                  <option value="mynote">내가 작성한 문서 검색</option>
                </select>
                <FormControl 
                  placeholder="검색어를 입력하세요"
                  defaultValue={q && q}
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
