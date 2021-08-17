import React, { useState, useEffect } from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
import { Form, Button } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { history } from "../../modules/configStore";
import { actionCreators as commentActions } from "../../modules/comment";
import { Edit2 } from "react-feather";

const CommentEdit = (props) => {
  const { commentId, content, writer } = props.props;
  const dispatch = useDispatch();
  const [modifiedComment, setModifiedComment] = useState(content);
  const [isEditMode, setIsEditMode] = useState(props.isEditMode);
  const editComment = () => {
    if (modifiedComment === "") {
      window.alert("댓글을 입력해주세요!");
      return;
    }

    const Comment = {
      content: modifiedComment,
    };
    dispatch(commentActions.__editComment(commentId, Comment));
    setIsEditMode(false);
  };

  const changeEditComment = (e) => {
    setModifiedComment(e.target.value);
  };

  return (
    <>
      {isEditMode ? (
        <div style={{ width: "95%", margin: "10px 5px 0px 5px", boxSizing: "borderBox" }}>
          <Comment>
            <CommentForm>
              <CommentTextArea type="text" placeholder="댓글을 입력하세요." defaultValue={content} onChange={changeEditComment} />

              <CommentInner>
                <CommnetBtnSide>
                  <CommentBtn
                    variant="primary"
                    type="summit"
                    onClick={() => {
                      editComment();
                    }}
                  >
                    저장
                  </CommentBtn>
                  <CommentBtn
                    variant="primary"
                    type="summit"
                    onClick={() => {
                      history.goBack();
                    }}
                  >
                    취소
                  </CommentBtn>
                </CommnetBtnSide>
              </CommentInner>
            </CommentForm>
          </Comment>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
const Comment = styled.div`
  flex-shrink: 0;
  position: relative;
  min-height: 114px;
  margin: 2px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #d3d3d3;
  padding-bottom: 11px;
`;
const CommentForm = styled.div`
  width: 100%;
  margin-top: 5px;
  padding-left: 14px;
  padding-right: 14px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const CommentInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2px;
  flex-basis: 100%;
`;
const CommentTextArea = styled.textarea`
  border: none;
  min-height: 60px;
  width: 100%;
  position: relative;
  outline: none;

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
  display: flex;
`;

export default CommentEdit;
