import React from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
import { Form, Button } from "react-bootstrap";
/* == Custom - Component */
import { CommentCard, CommentInput } from "..";

const CommentList = (props) => {
  const { history, match, projectId } = props;

  return (
    <Wrapper>
      <div style={{ overflow: "auto" }}>
        <CommentCard history={history} match={match} projectId={projectId} />
      </div>
      <div style={{ padding: "16px 0" }}>
        <CommentInput history={history} match={match} projectId={projectId} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div(
  ...t`
  width: 400px;
  height: 100%;
  display: flex; 
  flex-direction: column;
  justify-content: space-between;
`,
);

export default CommentList;
