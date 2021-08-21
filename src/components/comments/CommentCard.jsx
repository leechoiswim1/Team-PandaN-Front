import React, { useEffect, useState } from "react";
import moment from "moment";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
import { Form, Button } from "react-bootstrap";

import CommentEdit from "./CommentEdit";

import { actionCreators as commentActions } from "../../modules/comment";
import { useSelector, useDispatch } from "react-redux";
import { Bookmark, Clock, Edit2, Trash2 } from "react-feather";

import { ReactComponent as IconEdit } from "../../styles/images/icon-comment-edit.svg";

const CommentCard = (props) => {
  const { commentId, content, writer, modifiedAt, writerProfileImg } = props;
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

  // project에 노트 수정일 정보가 있을 경우 현재로부터 시간 차 구하기
  let hourDiff = modifiedAt && moment(modifiedAt).diff(moment(), "hours");
  // format 1, 수정한 지 하루 경과했을 경우 : YYYY.MM.DD hh:mm 
  const updated = moment(modifiedAt).format(" YYYY. M. D hh:mm");
  // format 2, 수정한 지 하루 이내일 경우 : 'n 분 전, n 시간 전'
  const recentlyUpdated = moment(modifiedAt).fromNow();

  // const createdAt = moment(modifiedAt).format(" YYYY. M. D hh:mm:ss");

  var writerProfileImg1 = "" + writerProfileImg;
  const http = writerProfileImg1.substring(0, 4);

  console.log(http);
  const userProfileImage =
    http === "http"
      ? writerProfileImg
      : "https://e7.pngegg.com/pngimages/287/501/png-clipart-giant-panda-emoji-coloring-book-drawing-sticker-emoji-child-face-thumbnail.png";

  return (
    <Card>
      <CardBody>
        <CardHeader>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <img src={userProfileImage} alt="userProfileImage" style={{ width: "25px", height: "25px", borderRadius: "12.5px" }} />

              <span style={{ margin: "0 5px", fontWeight: "600", fontSize: "16px" }}>{writer}</span>
            </div>
            {/* 시간 차 23시간 이상인지 ?
              format 1, 수정한 지 하루 경과했을 경우 : YYYY.MM.DD hh:mm : 
              format 2, 수정한 지 하루 이내일 경우 : 'n 분 전, n 시간 전' */}
            {hourDiff < -22 ? 
              <p style={{ fontWeight: "400", fontSize: "10px", paddingTop: "6px", marginLeft: "20px" }}>{updated}</p> :
              <p style={{ fontWeight: "400", fontSize: "10px", paddingTop: "6px", marginLeft: "20px" }}>{recentlyUpdated}</p>}
            {userName === writer ? (
              <button onClick={() => setMenu(!menu)} style={{ float: "right" }}>
                <IconEdit width="18px" />
              </button>
            ) : (
              ""
            )}
          </div>
          {menu === true ? (
            <MenuToggle>
              <Edit2
                style={{ width: "15px", cursor: "pointer" }}
                onClick={() => {
                  setIsEditMode(!isEditMode);
                  setMenu(false);
                }}
              />
              <Trash2 style={{ width: "15px", marginLeft: "10px", cursor: "pointer" }} onClick={deleteComment} />
            </MenuToggle>
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
  min-width:280px;
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
  color:#767676;
`,
);

const MenuToggle = styled.div`
  padding: 5px;
  float: right;
  background: #fff;
  border: 1px solid #767676;
  border-radius: 10px;
`;

const CardBody = styled.div``;

export default CommentCard;
