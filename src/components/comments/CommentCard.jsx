import React, { useState } from "react";

/* == Library */
import moment from "moment";

/* == Library - style */
import styled from "styled-components";
import CommentEdit from "./CommentEdit";

/* == Custom - Icon */
import { Edit2, Trash2 } from "react-feather";
import { ReactComponent as IconEdit } from "../../styles/images/icon-comment-edit.svg";

/* == Redux - actions */
import { actionCreators as commentActions } from "../../modules/comment";
import { useSelector, useDispatch } from "react-redux";

const CommentCard = (props) => {
  const { commentId, content, writer, modifiedAt, writerProfileImg } = props;
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.name);
  const [isEditMode, setIsEditMode] = useState(false);

  /* == function */
  const deleteComment = () => {
    if (window.confirm("정말로 댓글을 지우시겠습니까?😲") === true) {
      dispatch(commentActions.__deleteComment(commentId));
      window.alert("댓글을 성공적으로 삭제됐습니다!🐼");
    } else {
      return;
    }
  };

  //서버 시간 차이로 인한 댓글 시간 오류로 초까지만 사용
  const modifiedAtEditv1 = moment(modifiedAt).format("YYYY. M. D HH:mm:ss");
  // 항상 -2 초를 하여 몇초 후 오류를 개선
  const modifiedAtEditv2 = new Date(modifiedAtEditv1);
  modifiedAtEditv2.setSeconds(modifiedAtEditv2.getSeconds() - 2);

  // project에 노트 수정일 정보가 있을 경우 현재로부터 시간 차 구하기
  let hourDiff = modifiedAt && moment(modifiedAt).diff(moment(), "hours");
  // format 1, 수정한 지 하루 경과했을 경우 : YYYY.MM.DD hh:mm
  const updated = moment(modifiedAt).format(" YYYY. M. D hh:mm");
  // format 2, 수정한 지 하루 이내일 경우 : 'n 분 전, n 시간 전'
  const recentlyUpdated = moment(modifiedAtEditv2).fromNow();

  return (
    <Card>
      <div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <img src={writerProfileImg} alt="userProfileImage" style={{ width: "25px", height: "25px", borderRadius: "12.5px" }} />

              <span style={{ margin: "0 5px", fontWeight: "600", fontSize: "16px" }}>{writer}</span>
            </div>
            {/* 시간 차 23시간 이상인지 ?
              format 1, 수정한 지 하루 경과했을 경우 : YYYY.MM.DD hh:mm : 
              format 2, 수정한 지 하루 이내일 경우 : 'n 분 전, n 시간 전' */}
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: "20px" }}>
                {hourDiff < -22 ? (
                  <p style={{ fontWeight: "400", fontSize: "10px", paddingTop: "6px", marginLeft: "20px" }}>{updated}</p>
                ) : (
                  <p style={{ fontWeight: "400", fontSize: "10px", paddingTop: "6px", marginLeft: "20px" }}>{recentlyUpdated}</p>
                )}
              </div>
              {userName === writer ? (
                <div className="dropdown_cmt">
                  <div className="dropbtn_cmt">
                    <IconEdit width="18px" />
                  </div>
                  <div className="dropdown-content_cmt">
                    <Edit2
                      style={{ width: "15px", cursor: "pointer" }}
                      onClick={() => {
                        setIsEditMode(!isEditMode);
                      }}
                    />
                    <Trash2 style={{ width: "15px", marginLeft: "10px", cursor: "pointer" }} onClick={deleteComment} />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <Comment>{content}</Comment>
      </div>
      {isEditMode ? <CommentEdit props={props} isEditMode /> : ""}
    </Card>
  );
};

const Card = styled.div`
  width: 90%;
  background: #fff;
  margin: 20px auto;
  padding: 10px;
  min-width: 250px;
  border-radius: 10px;
  &:hover {
    background-color: #e1ede4;
  }
`;

const Comment = styled.div`
  margin-top: 8px;
  white-space: pre-wrap;
  word-break: keep-all;
  overflow-wrap: break-word;
  color: #767676;
`;
export default CommentCard;
