import React, { useEffect, useState } from "react";

/* == Library - style */
import styled from "styled-components";
import { t } from "../util/remConverter";
import { Container, InputGroup, FormControl, Badge, Button } from "react-bootstrap";

/* == Custom - Icon */
import { ReactComponent as IconSearch } from "../styles/images/ico-search.svg";

/* == Custom - Component */
import { Template } from "../components";

/* == Redux - actions */
import { useSelector, useDispatch } from "react-redux";
import { searchActions } from "../modules/search";

// * == ( Search ) -------------------- * //

const Search = ({ history }) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  console.log(keyword);

  useEffect(() => {
    dispatch(searchActions.__getSearchAll(keyword));
  }, [dispatch, keyword]);

  const searchResult = useSelector((state) => (state.search.list));
  console.log(searchResult);

  return (
    <Template>
      <Container fluid>
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
              onChange={(e)=> setKeyword(e.target.value)}
            />
            <button>
              <IconSearch width="40" height="40" fill="#767676"/>
            </button>
          </InputGroup>
        </div>

        <h1 className="mt-20 mb-30">검색결과</h1>
        <h2 className="mt-20 mb-30">전체결과 <small><Badge pill bg="warning">1건</Badge></small></h2>

        
          <div className="table-responsive">
            <table className="table data-table">
              <thead>
                <tr>
                  <th>문서제목</th>
                  <th>프로젝트명</th>
                  <th>작성날짜</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
              {searchResult.map((searchItem) => (
                <tr>
                  <td>{searchItem.title}</td>
                  <td>{searchItem.projectTitle}</td>
                  <td>{searchItem.writer}</td>
                  <td>{searchItem.step}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        
      </Container>
    </Template>
  );
}

export default Search;