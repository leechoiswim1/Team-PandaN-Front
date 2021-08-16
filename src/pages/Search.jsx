import React, { useEffect } from "react";

/* == Library - style */
import styled from "styled-components";
import { t } from "../util/remConverter";
import { Container, Button } from "react-bootstrap";

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
        <p>검색결과 페이지</p>
      </Container>
    </Template>
  );
}

export default Search;