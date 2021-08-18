import React, { useEffect, useState } from "react";

/* == Library - style */
import styled from "styled-components";
import { t } from "../util/remConverter";
import { Container, InputGroup, FormControl, Badge, Button } from "react-bootstrap";

/* == Custom - Icon */
import { ReactComponent as IconSearch } from "../styles/images/ico-search.svg";

/* == Custom - Component */
import { Template, SearchList, EmptySearch } from "../components";

/* == Redux - actions */
import { useSelector, useDispatch } from "react-redux";
import { searchActions } from "../modules/search";

// * == ( Search ) -------------------- * //

const Search = ({ history }) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [filterParm, setFilterParm] = useState(["All"]);

  const searchResult = useSelector((state) => (state.search.list));
  const searchKeyword = useSelector((state) => (state.search.keyword));

  console.log("3." + searchKeyword);

  // useEffect(() => {
  //   dispatch(searchActions.__getSearchAll(keyword));
  //   // if(filterParm === "All"){
  //   //   dispatch(searchActions.__getSearchAll(keyword));
  //   // } 
  //   // else if(filterParm === "Bookmark"){
  //   //   dispatch(searchActions.__getSearchBookmark(keyword));
  //   // }
  //   // else if(filterParm === "Mynote"){
  //   //   dispatch(searchActions.__getSearchMynote(keyword));
  //   // }
  // }, [dispatch, keyword, filterParm]);

  // console.log('filterParm, ' + filterParm);

  // const searchResult = useSelector((state) => (state.search.list));
  // console.log("1111searchResult: " + searchResult.noteId);
  // console.log(searchResult);‌‌
  // console.log(searchResult[0].noteId);

  const searchFilter = (e) => {
    console.log(keyword);
    setKeyword(e.target.value);
  }

  return (
    <Template searchKeyword={searchKeyword}>
      <Container fluid>
        <h1 className="mt-20 mb-30">검색결과</h1>
        <h2 className="mt-20 mb-30">전체결과 <small><Badge pill bg="warning">{searchResult.length}건</Badge></small></h2>

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
              { searchResult && <SearchList history={history} searchResult={searchResult}/> } 
              { searchResult?.noteId === undefined && <EmptySearch/> }
              {/* {searchResult.map((searchItem, idx) => (
                <tr key={idx}>
                  <td>{searchItem.title}</td>
                  <td>{searchItem.projectTitle}</td>
                  <td>{searchItem.writer}</td>
                  <td>{searchItem.step}</td>
                </tr>
              ))} */}
              </tbody>
            </table>
          </div>
        
      </Container>
    </Template>
  );
}

export default Search;