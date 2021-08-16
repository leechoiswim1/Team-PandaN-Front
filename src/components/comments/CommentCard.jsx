import React, { useEffect } from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
import { Form, Button } from "react-bootstrap";

import { actionCreators as commentActions } from "../../modules/comment";
import { useSelector, useDispatch } from "react-redux";

const CommentCard = (props) => {
  const { history, match, projectId } = props;
  const dispatch = useDispatch();
  // const comment_list = useSelector((state) => state.comment.list);
  const noteId = match.params.noteId;

  useEffect(() => {
    dispatch(commentActions.__getCommentList(noteId));
  }, []);

  // if (!comment_list) {
  //   return <div></div>;
  // }
  return (
    <Card>
      <CardHeader>
        <span style={{ fontWeight: "500" }}>작성자 이름</span>
        <span style={{ marginLeft: "8px" }}>작성 시간</span>
      </CardHeader>
      <Comment>댓글 내용</Comment>
    </Card>
  );
};

const Card = styled.div(
  ...t`
  margin: 0 0 8px;
  padding: 8px;
  &:hover {
    background-color: #ffffff;
  }
`,
);

const CardHeader = styled.div(
  ...t`
`,
);

const Comment = styled.div(
  ...t`
  padding: 8px 0;
`,
);

export default CommentCard;
