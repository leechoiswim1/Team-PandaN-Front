import React, { useState, useEffect } from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
import { Form, Button } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { history } from "../../modules/configStore";
import { actionCreators as commentActions } from "../../modules/comment";

const CommentInput = (props) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const noteId = props.match.params.noteId;
  const projectId = props.projectId;

  const CreateComment = () => {
    if (comment === "") {
      window.alert("댓글을 입력해주세요!");
      return;
    }
    console.log(noteId, comment);
    dispatch(commentActions.__postComment(noteId, comment));
  };

  const changeComment = (e) => {
    setComment(e.target.value);
  };
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control as="textarea" type="text" placeholder="댓글을 입력하세요." onChange={changeComment} />
      </Form.Group>
      <div style={{ textAlign: "right" }}>
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            CreateComment();
          }}
        >
          저장
        </Button>
      </div>
    </Form>
  );
};

export default CommentInput;
