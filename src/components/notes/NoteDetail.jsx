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
import { EditingNoteModal } from "..";

/* == Redux - actions */
import { useDispatch, useSelector } from "react-redux";
import { noteActions } from "../../modules/note";

// * == ( note detail ) -------------------- * //
const NoteDetail = ({ history, match, ...rest }) => {
  const dispatch = useDispatch();
  const noteId = match.params.noteId;
  const note = useSelector((state) => state.note.detail);
  const isBookmark = note.isBookmark;
  useEffect(() => {
    dispatch(noteActions.__getNoteDetail(noteId));
  }, [noteId]);

  const deadline = note.deadline ? moment(note.deadline).format("YYYY년 M월 D일") : "";
  const createdAt = moment(note.createdAt).format("작성: YYYY년 M월 D일");
  const modifiedAt = moment(note.modifiedAt).format("수정: YYYY년 M월 D일");

  let dateDiff = note.deadline ? moment(note.deadline).diff(moment(), "days") : "";

  /*
   * Function - Modal
   * modalVisible : project menu > 노트 작성 모달의 state와 구분
   */
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  /*
   * Function - delete note
   */
  const deleteNote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = window.confirm("노트를 삭제하시겠습니까?");
    if (result) {
      dispatch(noteActions.__deleteNote(noteId));
    } else return;
  };
  /*
   * Function - Bookmark ( 북마크 추가 / 삭제 )
   */
  const addBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(noteActions.__addBookmark(noteId));
  };
  const deleteBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = window.confirm("북마크에서 삭제하시겠습니까?");
    if (result) {
      dispatch(noteActions.__deleteBookmark(noteId));
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
            <button type="button" onClick={openModal} className="note-detail-header-button">
              <Edit2 />
            </button>
            {modalVisible && (
              <EditingNoteModal note={note} noteId={noteId} visible={modalVisible} closable={true} maskClosable={true} onClose={closeModal} />
            )}
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
            <InnerTitle> 멤버</InnerTitle>
          </Inner>
          <InnerDetail>{note.writer}</InnerDetail>
        </InnerLine>
        <InnerLine>
          <Inner>
            <IconCalendar />
            <InnerTitle> 마감일</InnerTitle>
          </Inner>
          <InnerDetail>
            {" "}
            <Tag dateDiff={dateDiff}>{deadline}</Tag>
          </InnerDetail>
        </InnerLine>
      </NoteHeader>
      <NoteBody>
        <Inner2>
          <IconNote />
          <InnerTitle>노트</InnerTitle>
        </Inner2>
        <NoteContents> {note.content}</NoteContents>
      </NoteBody>
      <NoteFooter>
        <p>{createdAt}</p>
        <p>{modifiedAt}</p>
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
  width: 20%;
  @media (max-width: 600px) {
    width: 30px;
  }
`;
const Inner2 = styled.div`
  display: flex;
  width: 20%;
  @media (max-width: 900px) {
    display: none;
  }
`;

const InnerTitle = styled.p`
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
  width: 80%;

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
  width: 80%;

  overflow-wrap: break-word;
  @media (max-width: 900px) {
    font-size: 14px;
    width: 100%;
  }
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const NoteHeader = styled.div`
heigth:20%
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
  min-hight: 30px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  font-size: 12px;

  color: #767676;
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
  color: ${(props) => (props.dateDiff <= -1 ? "#B00033" : "#000")}
  font-size: 16px;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

export default NoteDetail;
