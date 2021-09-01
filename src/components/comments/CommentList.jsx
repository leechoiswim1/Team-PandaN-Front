import React, { useEffect, useRef } from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
import { Form, Button } from "react-bootstrap";
import { CommentCard, CommentInput } from "..";
import { actionCreators as commentActions } from "../../modules/comment";
import { useSelector, useDispatch } from "react-redux";

const CommentList = React.memo((props) => {
  const { history, match, projectId } = props;
  const dispatch = useDispatch();
  const comment_list = useSelector((state) => state.comment.list);
  const noteId = match.params.noteId;
  const comment = props.comment;

  useEffect(() => {
    dispatch(commentActions.__getCommentList(noteId));
  }, []);
  const commentsEndRef = useRef(null);
  // 댓글 스크롤 밑으로 이동
  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [comment_list]);

  if (!comment_list) {
    return <div></div>;
  }
  return (
    <>
      {comment ? (
        <Wrapper>
          <div style={{ margin: "10px 18px" }}>
            <p>
              댓글{" "}
              <span style={{ background: "#387e4b", color: "#fff", borderRadius: "10px", padding: "0 6px", fontSize: "12px" }}>
                {comment_list.length}
              </span>
            </p>
          </div>
          <CardWrap>
            {comment_list.map((comment, index) => {
              return (
              <React.Fragment key={index}>
                <CommentCard  {...comment} />
              </React.Fragment>
            )})}
            <div ref={commentsEndRef} />
          </CardWrap>

          <div style={{ padding: "16px 0" }}>
            <CommentInput history={history} match={match} projectId={projectId} />
          </div>
        </Wrapper>
      ) : (
        ""
      )}
    </>
  );
});

const Wrapper = styled.div`
  position: sticky;
  width: 320px;
  height: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 5px 10px 20px rgba(25, 25, 25, 0.1);
  @media (max-width: 768px) {
    width: 100%;
    max-height: 600px;
    margin: 10px 0px 0px 0px;
  }
`;

const CardWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 98%;
  justify-content: flex-start;
  overflow: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e1ede4;
    border: 2px solid transparent;
    border-top-left-radius: 50px;
    border-bottom-right-radius: 50px;
  }
`;

export default CommentList;
