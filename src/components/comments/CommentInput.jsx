import React, { useState } from "react";
/* == Library - style */
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../../modules/comment";

const CommentInput = (props) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const noteId = props.match.params.noteId;

  const CreateComment = () => {
    if (comment === "") {
      window.alert("댓글을 입력해주세요!");
      return;
    }

    const Comment = {
      content: comment,
    };

    dispatch(commentActions.__postComment(noteId, Comment));
    setComment("");
  };

  const changeComment = (e) => {
    setComment(e.target.value);
  };

  const EnterSummit = (e) => {
    if (e.key === "Enter") {
      CreateComment();
    }
  };

  return (
    <div style={{ width: "95%", margin: "auto", boxSizing: "borderBox", position: "relative" }}>
      <Comment>
        <CommentForm>
          <CommentTextArea type="text" placeholder="댓글을 입력하세요." value={comment} onChange={changeComment} onKeyPress={EnterSummit} />

          <CommentInner>
            <CommnetBtnSide>
              <CommentBtn
                variant="primary"
                type="summit"
                onClick={() => {
                  CreateComment();
                }}
              >
                저장
              </CommentBtn>
            </CommnetBtnSide>
          </CommentInner>
        </CommentForm>
      </Comment>
    </div>
  );
};
const Comment = styled.div`
  flex-shrink: 0;
  position: relative;
  min-height: 114px;
  margin: 8px;
  background-color: #f5f5f5;
  border-radius: 20px;
  border: 1px solid #f5f5f5;
  padding-bottom: 11px;
`;
const CommentForm = styled.div`
  width: 100%;
  margin-top: 14px;
  padding-left: 14px;
  padding-right: 14px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #f5f5f5;
`;

const CommentInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 13px;
  flex-basis: 100%;
  background-color: #f5f5f5;
`;
const CommentTextArea = styled.textarea`
  border: none;
  min-height: 40px;
  width: 100%;
  position: relative;
  outline: none;
  background-color: #f5f5f5;
  resize: none;
`;

const CommentBtn = styled.button`
  font-size: 12px;
  padding: 5px 10px;
  background-color: #387e4b;
  border-radius: 3px;
  color: #fff;
  align-content: space-between;
  float: right;
`;

const CommnetBtnSide = styled.div`
  width: 100%;
`;

export default CommentInput;
