import React from "react";

/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
import { Container, InputGroup, FormControl, Badge, Button } from "react-bootstrap";

/* == Library - date */
import moment from "moment";

/* == Custom - Icon */

/* == Custom - Component */

/* == Redux - actions */

// * == ( SearchList ) -------------------- * //

const SearchList = ({ history, searchResult }) => {
  const createdAt = moment(searchResult.createdAt).format("YYYY년 M월 D일");

  return (
    <>
      {searchResult.map((searchItem, idx) => (
        (<tr key={idx} onClick={(e) => history.push(`/projects/${searchItem.projectId}/notes/${searchItem.noteId}`)}>
          <td>{searchItem.title}</td>
          <td>{searchItem.projectTitle}</td>
          <td>{searchItem.writer ? searchItem.writer : "-" }</td>
          <td>{createdAt}</td>
          <td>{searchItem.step}</td>
        </tr>)
      ))}
    </>
  );
}

export default SearchList;