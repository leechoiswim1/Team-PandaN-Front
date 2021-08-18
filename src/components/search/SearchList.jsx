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

const SearchList = ({ history, searchResult }) => {
  const dispatch = useDispatch();
  console.log(searchResult);
  
  return (
    <>
      {searchResult.map((searchItem, idx) => (
        (<tr key={idx} onClick={(e) => history.push(`/projects/${searchItem.projectId}/notes/${searchItem.noteId}`)}>
          <td>{searchItem.title}</td>
          <td>{searchItem.projectTitle}</td>
          <td>{searchItem.writer}</td>
          <td>{searchItem.step}</td>
        </tr>)
      ))}
    </>
  );
}

export default SearchList;