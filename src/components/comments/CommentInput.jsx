import React  from "react";
/* == Library - style */
import styled from "styled-components";
import { t }  from "../../util/remConverter";
import { Form, Button } from "react-bootstrap";

const CommentInput = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control as="textarea" type="text" placeholder="댓글을 입력하세요." />
      </Form.Group>
      <div style={{textAlign: "right"}}>
      <Button variant="primary" type="submit">
        저장
      </Button>
      </div>
    </Form>
  );
};

export default CommentInput;
