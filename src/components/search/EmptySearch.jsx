import React, { useEffect, useState } from "react";

/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
import { Container, InputGroup, FormControl, Badge, Button } from "react-bootstrap";

/* == Custom - Icon */
import { ReactComponent as IconSearch } from "../../styles/images/ico-search.svg";

/* == Custom - Component */
// import { Template } from "..";

/* == Redux - actions */
import { useSelector, useDispatch } from "react-redux";
import { searchActions } from "../../modules/search";

// * == ( SearchList ) -------------------- * //

const EmptySearch = ({ history, searchResult }) => {
  const dispatch = useDispatch();
  console.log(searchResult);

  return (
    <>
      <tr>
        <td colSpan="5">
          <p>검색결과가 없습니다.</p>
        </td>
      </tr>
    </>
  );
};

export default EmptySearch;
