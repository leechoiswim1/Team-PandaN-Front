import React from "react";

/* == Library - style */
import styled from "styled-components";

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
        <TableTr key={idx} onClick={(e) => history.push(`/projects/${searchItem.projectId}/notes/${searchItem.noteId}`)}>
          <td>{searchItem.title}</td>
          <td>{searchItem.projectTitle}</td>
          <td>{searchItem.writer ? searchItem.writer : "-"}</td>
          <td>{createdAt}</td>
          <td>{searchItem.step}</td>
        </TableTr>
      ))}
    </>
  );
};

const TableTr = styled.tr`
  cursor: pointer;
  &:hover {
    background: #e1ede4;
  }
`;

export default SearchList;
