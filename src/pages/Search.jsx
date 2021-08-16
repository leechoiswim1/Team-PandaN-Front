import React, { useEffect } from "react";

/* == Library - style */
import styled from "styled-components";
import { t } from "../util/remConverter";
import { Container, Badge, Button } from "react-bootstrap";

/* == Custom - Component */
import { Template } from "../components";

/* == Redux - actions */
import { useSelector, useDispatch } from "react-redux";
import { searchActions } from "../modules/search";

// * == ( Search ) -------------------- * //

const Search = ({ history }) => {
  return (
    <Template>
      <Container fluid>
        <h1 className="mt-20 mb-30">검색결과</h1>
        <h2 className="mt-20 mb-30">전체결과 <small><Badge pill bg="warning">1건</Badge></small></h2>
        <div className="table-responsive">
          <table className="table data-table">
            <thead>
              <th>문서제목</th>
              <th>프로젝트명</th>
              <th>작성날짜</th>
              <th>상태</th>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="mt-60 mb-60"/>

        <h2 className="mt-20 mb-30">북마크 검색결과 <small><Badge pill bg="warning">1건</Badge></small></h2>
        <div className="table-responsive">
          <table className="table data-table">
            <thead>
              <th>문서제목</th>
              <th>프로젝트명</th>
              <th>작성날짜</th>
              <th>상태</th>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="mt-60 mb-60"/>

        <h2 className="mt-20 mb-30">내가 작성한 문서 검색결과 <small><Badge pill bg="warning">1건</Badge></small></h2>
        <div className="table-responsive">
          <table className="table data-table">
            <thead>
              <th>문서제목</th>
              <th>프로젝트명</th>
              <th>작성날짜</th>
              <th>상태</th>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </Template>
  );
}

export default Search;