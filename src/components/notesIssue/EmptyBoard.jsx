import React from "react";
/* == Library - style */
import styled from "styled-components";
/* == Redux - actions */
import { useSelector } from "react-redux";

// * == ( Note / EmptyBoard ) -------------------- * //
const EmptyBoard = ({ type }) => {
  /* 
  - 상위 페이지 : Bookmark, MyNote, ProjectIssue, ProjectMyNote
  - 상위 페이지에서 넘겨받은 페이지 타입에 따라 '해당 페이지 내 문서가 없음'을 알려줍니다.
  */
  const projectTitle = useSelector((state) => state.project?.detailList[0]?.title);

  if (type === "bookmark") {
    return (
      <Container>
        <h1>북마크에 담은 문서가 없습니다.</h1>
      </Container>
    );
  }

  if (type === "myNote") {
    return (
      <Container>
        <h1>
          전체 프로젝트에 <br />
          내가 작성한 문서가 없습니다.
        </h1>
      </Container>
    );
  }

  if (type === "projectIssue") {
    return (
      <Container>
        <h1>
          {projectTitle}에 <br />
          문서가 없습니다.
        </h1>
      </Container>
    );
  }

  if (type === "projectMyNote") {
    return (
      <Container>
        <h1>
          {projectTitle}에 <br />
          내가 작성한 문서가 없습니다.
        </h1>
      </Container>
    );
  }
};

const Container = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: normal;
  word-break: break-all;
  overflow-wrap: break-word;

  h1 {
    font-weight: bold;
    font-size: 1.3rem;
    letter-spacing: -0.03rem;
    color: #767676;
    text-align: center;
  }
`;

export default EmptyBoard;
