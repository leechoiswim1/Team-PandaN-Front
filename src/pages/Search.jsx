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
import { useParams } from "react-router-dom";

// * == ( Search ) -------------------- * //

const Search = ({ history, match }) => {
  const dispatch = useDispatch();
  const { category, q } = useParams();

  const searchResult = useSelector((state) => state.search.list);
  const searchKeyword = useSelector((state) => state.search.keyword);

  // console.log("3." + searchKeyword);

  useEffect(() => {
    // dispatch(searchActions.__getSearchAll(keywordParams.q));
    if (category === "all") {
      dispatch(searchActions.__getSearchAll(q));
    } else if (category === "bookmark") {
      dispatch(searchActions.__getSearchBookmark(q));
    } else if (category === "mynote") {
      dispatch(searchActions.__getSearchMynote(q));
    }
  }, [dispatch, q, category]);

  const searchCategory = category === "all" ? "전체" : category === "bookmark" ? "북마크" : "내가 작성한 문서";

  return (
    <Template match={match}>
      <div className="content" id="content">
        <div className="note-board-container">
          <div className="table-responsive">
            <h2 className="mt-20 mb-30" style={{ fontWeight: "bold" }}>
              {searchCategory} 검색결과
            </h2>
            <h3>
              "<span style={{ fontWeight: "bold", color: "#387E4B" }}>{q}</span>
              "에 대한 검색결과
              <small style={{ marginLeft: "5px" }}>
                <Badge pill bg="warning">
                  {searchResult ? searchResult?.length : "0"}건
                </Badge>
              </small>
            </h3>
            <table className="table note-issue-table">
              <thead>
                <tr>
                  <th>문서제목</th>
                  <th>프로젝트명</th>
                  <th>작성자</th>
                  <th>작성날짜</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                {searchResult && <SearchList history={history} searchResult={searchResult} />}
                {searchResult?.length === 0 && <EmptySearch />}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Template>
  );
};

export default Search;
