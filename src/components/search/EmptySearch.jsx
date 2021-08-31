import React from "react";

const EmptySearch = ({ history, searchResult }) => {
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
