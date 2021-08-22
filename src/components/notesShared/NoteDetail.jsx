import React, { useState, useEffect } from "react";

/* == Library - style */
import styled, { css } from "styled-components";
import { Bookmark, Clock, Edit2, Trash2 } from "react-feather";

/* == Library - date */
import moment from "moment";

/* == Custom - Icon */
import IconSteps from "../../elements/IconSteps";
import { ReactComponent as IconTitle } from "../../styles/images/icon_title.svg";
import { ReactComponent as IconCalendar } from "../../styles/images/icon_calender.svg";
import { ReactComponent as IconMember } from "../../styles/images/icon_member2.svg";
import { ReactComponent as IconNote } from "../../styles/images/icon_note.svg";
/* == Custom - Component */
import { ModalWriting } from "..";

/* == Redux - actions */
import { useDispatch, useSelector } from "react-redux";
import { noteActions } from '../../modules/note';
import { noteKanbanActions } from '../../modules/noteKanban';

// * == ( note detail ) -------------------- * //
const NoteDetail = ({ history, match, ...rest }) => {
  const dispatch = useDispatch();
  const noteId = match.params.noteId;
  const note = useSelector((state) => state.noteKanban.detail);
  const isBookmark = note.isBookmark;
  useEffect(() => {
    dispatch(noteKanbanActions.__getNoteDetail(noteId));
  }, [noteId]);

  const deadline = note.deadline ? moment(note.deadline).format("YYYY. M. D") : "";
  const createdAt = moment(note.createdAt).format("작성: YYYY. M. D");
  const modifiedAt = moment(note.modifiedAt).format("수정: YYYY. M. D");

  let dateDiff = note.deadline ? moment(note.deadline).diff(moment(), "days") : "";

  // project에 노트 수정일 정보가 있을 경우 현재로부터 시간 차 구하기
  let hourDiff = note.modifiedAt && moment(note.modifiedAt).diff(moment(), "hours");
  // format 1, 수정한 지 하루 경과했을 경우 : YYYY.MM.DD hh:mm 
  const updated = moment(note.modifiedAt).format(" YYYY. M. D hh:mm");
  // format 2, 수정한 지 하루 이내일 경우 : 'n 분 전, n 시간 전'
  const recentlyUpdated = moment(note.modifiedAt).fromNow();

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
    <div className="note-detail-wrapper" style={{ height: "100%", minHeight: "400px", minWidth: "300px" }}>
      <div className="note-detail-header" style={{ height: "5%" }}>
        <div className="note-detail-header-step">
          <div>
            <Tag type={note.step} style={{ padding: "0px 5px", borderRadius: "10px", color: "#fff" }}>
              <p>{note.step}</p>
            </Tag>
          </div>

          <div>
            {/* buttons - edit */}
            <ModalWriting modalType="editing" />
            {/* buttons - delete */}
            <button type="button" onClick={deleteNote} className="note-detail-header-button">
              <Trash2 />
            </button>
            {/* buttons - bookmark */}
            {!isBookmark ? (
              <button type="button" onClick={addBookmark} className="note-detail-header-button">
                <Bookmark />
              </button>
            ) : (
              <button type="button" onClick={deleteBookmark} className="note-detail-header-button">
                <Bookmark fill="#387E4B" stroke="#387E4B" />
              </button>
            )}
          </div>
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
        {hourDiff < -22 ? <p>{updated}</p> : <p>마지막 수정: {recentlyUpdated}</p>}        
      </NoteFooter>
    </div>
  );
};

const InnerLine = styled.div`
  height: 45px;
  display: flex;
  border-bottom: 1px solid #ededed;
  align-items: center;
  @media (max-width: 600px) {
    height: 38px;
  }
`;

const Inner = styled.div`
  display: flex;
  width: 100px;
  @media (max-width: 600px) {
    width: 80px;
  }
`;
const Inner2 = styled.div`
  display: flex;
  width: 110px;
  @media (max-width: 900px) {
    display: none;
  }
`;

const InnerTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #767676;
  margin-left: 5px;
  @media (max-width: 600px) {
    font-size: 13px;
  }
`;
const InnerTitle2 = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #767676;
  margin-left: 5px;

  @media (max-width: 900px) {
    display: none;
  }
`;
const InnerDetail = styled.p`
  font-size: 16px;
  font-weight: 500;
  word-break: break-all;

  @media (max-width: 600px) {
    font-size: 13px;
  }
`;
const NoteContents = styled.p`
  font-size: 16px;
  font-weight: 500;
  word-break: break-all;
  white-space: normal;
  overflow: auto;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  padding-right: 10px;
  width: 100%;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e1ede4;
    border: 2px solid transparent;
    border-top-left-radius: 50px;
    border-bottom-right-radius: 50px;
  }
  @media (max-width: 900px) {
    font-size: 14px;
  }
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const NoteHeader = styled.div`
  height: 20%;
  white-space: normal;
  word-break: break-all;
  overflow-wrap: break-word;
  min-height:100px;
`;
const NoteBody = styled.div`
  height: 70%;
  min-height: 150px;
  display: flex;
  margin-top: 10px;
`;

const NoteFooter = styled.div`
  height: 5%;
  min-height: 30px;
  align-items: center;
  text-align: center;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #767676;
  @media (max-width: 600px) {
    font-size: 10px;
    margin-top: 10px;
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
