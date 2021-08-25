import React, { useState, useEffect } from "react";

/* == Library - style */
import styled, { css } from "styled-components";
import { Bookmark, Clock, Edit2, Trash2 } from "react-feather";

/* == Library - date */
import moment from "moment";

/* == Library - route */
import { useParams } from "react-router-dom";

/* == Custom - Component & Element & Icon */
import IconSteps from "../../elements/IconSteps";
import Labels from "../../elements/Labels";
import { ReactComponent as Write } from "../../styles/images/ico-kanban-write.svg";
import { ReactComponent as Add } from "../../styles/images/ico-kanban-write.svg";
import { ReactComponent as Close } from "../../styles/images/ico-close.svg";
import { ReactComponent as IconWorking } from "../../styles/images/icon-status-working.svg";
import { ReactComponent as IconTitle } from "../../styles/images/icon_title.svg";
import { ReactComponent as IconCalendar } from "../../styles/images/icon_calender.svg";
import { ReactComponent as IconMember } from "../../styles/images/icon_member2.svg";
import { ReactComponent as IconNote } from "../../styles/images/icon_note.svg";
import { ReactComponent as IconLink } from "../../styles/images/ico-link.svg";
import { ReactComponent as IconComment } from "../../styles/images/icon_comment.svg";

import { CommentList } from "..";

/* == Custom - Component */
import { ModalWriting } from "..";

/* == Redux - actions */
import { useDispatch, useSelector } from "react-redux";
import { noteActions } from "../../modules/note";
import { noteKanbanActions } from "../../modules/noteKanban";

// * == ( note detail ) -------------------- * //
const NoteDetail = ({ history, match, projectId, ...rest }) => {
  const dispatch = useDispatch();
  const { noteId } = useParams();

  const [showCmt, setShowCmt] = useState(false);
  // state
  const note = useSelector((state) => state.noteKanban.detail?.detail);
  const files = useSelector((state) => state.noteKanban.detail?.files);

  const project = useSelector((state) => state.project.detailList[0]);
  const projectTitle = project?.title;

  const isBookmark = note?.isBookmark;
  useEffect(() => {
    dispatch(noteKanbanActions.__getNoteDetail(noteId));
  }, [noteId]);

  const deadline = note?.deadline ? moment(note.deadline).format("YYYY. M. D") : "";
  const createdAt = moment(note?.createdAt).format("작성: YYYY. M. D");
  const modifiedAt = moment(note?.modifiedAt).format("수정: YYYY. M. D");

  let dateDiff = note?.deadline ? moment(note.deadline).diff(moment(), "days") : "";

  // project에 노트 수정일 정보가 있을 경우 현재로부터 시간 차 구하기
  let hourDiff = note?.modifiedAt && moment(note.modifiedAt).diff(moment(), "hours");
  // format 1, 수정한 지 하루 경과했을 경우 : YYYY.MM.DD hh:mm
  const updated = moment(note?.modifiedAt).format(" YYYY. M. D hh:mm");
  // format 2, 수정한 지 하루 이내일 경우 : 'n 분 전, n 시간 전'
  const recentlyUpdated = moment(note?.modifiedAt).fromNow();

  /*
   * Function - delete note
   */
  const deleteNote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = window.confirm("노트를 삭제하시겠습니까?");
    if (result) {
      dispatch(noteKanbanActions.__deleteNote(noteId));
    } else return;
  };
  /*
   * Function - Bookmark ( 북마크 추가 / 삭제 )
   */
  const addBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(noteKanbanActions.__addBookmark(noteId));
  };
  const deleteBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = window.confirm("북마크에서 삭제하시겠습니까?");
    if (result) {
      dispatch(noteKanbanActions.__deleteBookmark(noteId));
    } else return;
  };

  return (
    <NoteDetailWrap>
      <div className="note-detail-wrapper">
        <div className="note-detail-table">
          <div className="note-detail-tr">
            <div className="note-detail-th cell-align-top">
              <IconWorking width="20" height="20" fill="#767676" />
              <span>Project</span>
            </div>
            <div className="note-detail-td cell-align-top">
              <span>{projectTitle}</span>
              <div>
                {/* buttons - edit */}
                <ModalWriting modalType="editing" />
                {/* buttons - delete */}
                <button type="button" onClick={deleteNote} className="note-detail-button">
                  <Trash2 />
                </button>
                {/* buttons - bookmark */}
                {!isBookmark ? (
                  <button type="button" onClick={addBookmark} className="note-detail-button">
                    <Bookmark />
                  </button>
                ) : (
                  <button type="button" onClick={deleteBookmark} className="note-detail-button">
                    <Bookmark fill="#387E4B" stroke="#387E4B" />
                  </button>
                )}
                {/* buttons - comment */}
                <button type="button" onClick={() => setShowCmt(!showCmt)} className="note-detail-button">
                  <IconComment fill="#387E4B" stroke="#387E4B" />
                </button>
              </div>
            </div>
          </div>
          <div className="note-detail-tr">
            <div className="note-detail-th cell-align-top">
              <IconTitle />
              제목
            </div>
            <div className="note-detail-td cell-text-title cell-text-bold">{note?.title}</div>
          </div>
          <div className="note-detail-tr">
            <div className="note-detail-th">
              <IconMember />
              작성자
            </div>
            <div className="note-detail-td">{note?.writer}</div>
          </div>
          <div className="note-detail-tr">
            <div className="note-detail-th">
              <IconCalendar />
              마감일
            </div>
            <div className="note-detail-td cell-text-bold">
              <Tag dateDiff={dateDiff}>{deadline}</Tag>
            </div>
          </div>
          <div className="note-detail-tr">
            <div className="note-detail-th">
              <IconCalendar />
              상태
            </div>
            <div className="note-detail-td">
              <Labels type={note?.step}>{note?.step}</Labels>
            </div>
          </div>
          <div className="note-detail-tr cell-file-upload">
            <div className="note-detail-th cell-align-top">
              <IconLink width="24" height="24" fill="#767676" />
              첨부파일
            </div>
            <div className="note-detail-td cell-align-top">
              <ul>
                {files.map((file, index) => (
                  <li key={index}>
                    {index + 1}.<a href={file.fileUrl}>{file.fileName}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="note-detail-tr cell-align-top">
            <div className="note-detail-th cell-align-top">
              <IconNote />할 일
            </div>
            <div className="note-detail-td">{note?.content}</div>
          </div>
        </div>

        {/* <div className="note-detail-header" style={{ height: "5%" }}>
        <div className="note-detail-header-step">
          <div>
            <Tag type={note.step} style={{ padding: "0px 5px", borderRadius: "10px", color: "#fff" }}>
              <p>{note.step}</p>
            </Tag>
          </div>

          <div>
            {/* buttons - edit */}
        {/* <ModalWriting modalType="editing" /> */}
        {/* buttons - delete */}
        {/* <button type="button" onClick={deleteNote} className="note-detail-header-button">
              <Trash2 />
            </button> */}
        {/* buttons - bookmark  */}
        {/* {!isBookmark ? (
              <button type="button" onClick={addBookmark} className="note-detail-header-button">
                <Bookmark />
              </button>
            ) : (
              <button type="button" onClick={deleteBookmark} className="note-detail-header-button">
                <Bookmark fill="#387E4B" stroke="#387E4B" />
              </button>
            )} */}
        {/* </div>
        </div>
      </div>
      <NoteHeader>
        <InnerLine>
          <Inner>
            <IconTitle />
            <InnerTitle> 제목</InnerTitle>
          </Inner>
          <InnerDetail>{note.title}</InnerDetail>
        </InnerLine>

        <InnerLine>
          <Inner>
            <IconMember />
            <InnerTitle> 작성자 </InnerTitle>
          </Inner>
          <InnerDetail>{note.writer}</InnerDetail>
        </InnerLine>
        <InnerLine>
          <Inner>
            <IconCalendar />
            <InnerTitle> 마감일</InnerTitle>
          </Inner>
          <InnerDetail>
            <Tag dateDiff={dateDiff}>{deadline}</Tag>
          </InnerDetail>
        </InnerLine>
      </NoteHeader>
      <NoteBody>
        <Inner2>
          <IconNote />
          <InnerTitle2>노트</InnerTitle2>
        </Inner2>
        <NoteContents> {note.content}</NoteContents>
      </NoteBody>
      <NoteFooter>
        <p>{createdAt}</p>
        {/* 시간 차 23시간 이상인지 ?
          format 1, 수정한 지 하루 경과했을 경우 : YYYY.MM.DD hh:mm : 
          format 2, 수정한 지 하루 이내일 경우 : 'n 분 전, n 시간 전' */}
        {/* {hourDiff < -22 ? <p>{updated}</p> : <p>마지막 수정: {recentlyUpdated}</p>}        
      </NoteFooter> */}
      </div>
      <CommentList comment={showCmt} history={history} match={match} projectId={projectId} />
    </NoteDetailWrap>
  );
};

const NoteDetailWrap = styled.div`
  display: flex;
  @media (max-width: 400px) {
    display: block;
    width: 100%;
  }
`;
const Tag = styled.div`
  ${(props) =>
    !props.type &&
    css`
      background-color: none;
    `}
  ${(props) =>
    props.type === "STORAGE" &&
    css`
      background-color: #ffcd40;
    `}
${(props) =>
    props.type === "TODO" &&
    css`
      background-color: #adbe4f;
    `}
${(props) =>
    props.type === "PROCESSING" &&
    css`
      background-color: #9bd09c;
    `}
${(props) =>
    props.type === "DONE" &&
    css`
      background-color: #f5daae;
    `}
  color: ${(props) => (props.dateDiff <= -1 ? "#B00033" : "#000")};
  font-size: 16px;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

export default NoteDetail;
