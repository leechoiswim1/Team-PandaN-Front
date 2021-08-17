import React, { useEffect, useState } from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
import { Form, Button } from "react-bootstrap";

import CommentEdit from "./CommentEdit";

import { actionCreators as commentActions } from "../../modules/comment";
import { useSelector, useDispatch } from "react-redux";
import { Bookmark, Clock, Edit2, Trash2 } from "react-feather";

const CommentCard = (props) => {
  const { commentId, content, writer } = props;
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);

  const [menu, setMenu] = useState(false);
  const userName = useSelector((state) => state.user.name);

  const deleteComment = () => {
    if (window.confirm("정말로 댓글을 지우시겠습니까?😲") === true) {
      dispatch(commentActions.__deleteComment(commentId));
      window.alert("댓글을 성공적으로 삭제됐습니다!🐼");
    } else {
      return;
    }
  };

  return (
    <Card>
      <CardBody>
        <CardHeader>
          <span style={{ fontWeight: "500" }}>{writer}</span>
          {userName === writer ? (
            <>
              <button onClick={() => setMenu(true)}>박스</button>
              {menu === true ? (
                <div>
                  <Edit2
                    style={{ width: "15px", marginLeft: "10px", cursor: "pointer" }}
                    onClick={() => {
                      setIsEditMode(!isEditMode);
                    }}
                  />
                  <Trash2 style={{ width: "15px", marginLeft: "10px", cursor: "pointer" }} onClick={deleteComment} />
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </CardHeader>
        <Comment>{content}</Comment>
      </CardBody>
      {isEditMode ? <CommentEdit props={props} isEditMode /> : ""}
    </Card>
  );
};

const Card = styled.div(
  ...t`
  width: 90%;
  background: #fff;
  margin: 20px auto;
  padding: 10px;
  border: 1px solid #e1e1e1;
  border-radius: 10px;


  &:hover {
    background-color: #e1ede4;
  }
 
`,
);

const CardHeader = styled.div(
  ...t`
`,
);

const Comment = styled.div(
  ...t`
  margin-top: 8px;
  white-space: pre-wrap;
  word-break: keep-all;
  overflow-wrap: break-word;
`,
);

const CardBody = styled.div``;

export default CommentCard;
