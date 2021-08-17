import React, { useEffect } from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
import { Form, Button } from "react-bootstrap";
import { CommentCard, CommentInput } from "..";
import { actionCreators as commentActions } from "../../modules/comment";
import { useSelector, useDispatch } from "react-redux";
import { Bookmark, Clock, Edit2, Trash2 } from "react-feather";

import { ReactComponent as Write } from "../../styles/images/ico-kanban-write.svg";

const CommentList = (props) => {
  const { history, match, projectId } = props;
  const dispatch = useDispatch();
  const comment_list = useSelector((state) => state.comment.list);
  const noteId = match.params.noteId;

  useEffect(() => {
    dispatch(commentActions.__getCommentList(noteId));
  }, []);

  if (!comment_list) {
    return <div></div>;
  }
  return (
    <Wrapper>
      <div style={{ overflow: "auto" }}>
        {comment_list.map((comment) => {
          return <CommentCard key={comment.id} {...comment} />;
        })}
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
  background-color: #FFFFFF;
  border-radius: 1rem;
  box-shadow: 5px 10px 20px  rgba(25, 25, 25, 0.1);
`,
);

export default CommentList;
