import React, { useEffect, useRef } from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
import { Form, Button } from "react-bootstrap";
import { CommentCard, CommentInput } from "..";
import { actionCreators as commentActions } from "../../modules/comment";
import { useSelector, useDispatch } from "react-redux";

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
      <div style={{ margin: "10px 18px", position: "sticky", top: "4px", zIndex: "1" }}>
        <p>
          댓글{" "}
          <span style={{ background: "#387e4b", color: "#fff", borderRadius: "10px", padding: "0 6px", fontSize: "12px" }}>
            {comment_list.length}
          </span>
        </p>
      </div>
      <CardWrap>
        {comment_list.map((comment) => {
          return <CommentCard key={comment.id} {...comment} />;
        })}
      </CardWrap>

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
  margin-left:10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #FFFFFF;
  border-radius: 1rem;
  box-shadow: 5px 10px 20px  rgba(25, 25, 25, 0.1);
`,
);

const CardWrap = styled.div`
  overflow: auto;
  alignItems: flexStart; 
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;;
`;

export default CommentList;
