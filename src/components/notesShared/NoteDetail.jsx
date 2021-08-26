import React, { useState, useEffect } from "react";

/* == Library - style */
import styled, { css } from "styled-components";
import { Bookmark, MessageCircle, Trash2 } from "react-feather";

/* == Library - date */
import moment from "moment";

/* == Library - route */
import { useParams } from "react-router-dom";

/* == Custom - Component & Element & Icon */
import Labels from "../../elements/Labels";
import { ReactComponent as IconWorking } from "../../styles/images/icon-status-working.svg";
import { ReactComponent as IconTitle } from "../../styles/images/icon_title.svg";
import { ReactComponent as IconCalendar } from "../../styles/images/icon_calender.svg";
import { ReactComponent as IconMember } from "../../styles/images/icon_member2.svg";
import { ReactComponent as IconNote } from "../../styles/images/icon_note.svg";
import { ReactComponent as IconLink } from "../../styles/images/ico-link.svg";

/* == Custom - Component */
import { ModalEditing, CommentList } from "..";

/* == Redux - actions */
import { useDispatch, useSelector } from "react-redux";
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
  const createdAt = moment(note?.createdAt).format("YYYY. M. D");
  const modifiedAt = moment(note?.modifiedAt).format("YYYY. M. D");

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
    <div>
      <NoteDetailWrap>
        <NoteDetailInner>
          <DetailContent>
            <Content>
              <ContentLeft>
                <IconWorking width="20" height="20" fill="#767676" />
                <MenuName>Project</MenuName>
              </ContentLeft>
              <ContentRight>
                <TopRight>
                  <ProjectTitle>
                    <ContentText style={{ color: "#387E4B" }}>{projectTitle}</ContentText>
                  </ProjectTitle>
                  <InnerButton>
                    {/* buttons - edit */}
                    <Button>
                      <ModalEditing modalType="editing" note={note} />
                    </Button>
                    {/* buttons - delete */}
                    <Button onClick={deleteNote}>
                      <Trash2 />
                    </Button>
                    {/* buttons - bookmark */}
                    {!isBookmark ? (
                      <Button onClick={addBookmark}>
                        <Bookmark />
                      </Button>
                    ) : (
                      <Button onClick={deleteBookmark}>
                        <Bookmark fill="#387E4B" stroke="#387E4B" />
                      </Button>
                    )}
                    {/* buttons - comment */}
                    <Button onClick={() => setShowCmt(!showCmt)}>
                      <MessageCircle />
                    </Button>
                  </InnerButton>
                </TopRight>
              </ContentRight>
            </Content>
            <Content>
              <ContentLeft>
                <IconTitle />
                <MenuName>제목</MenuName>
              </ContentLeft>
              <ContentRight>
                <ContentText>{note?.title}</ContentText>
              </ContentRight>
            </Content>
            <Content>
              <ContentLeft>
                <IconMember />
                <MenuName>작성자</MenuName>
              </ContentLeft>
              <ContentRight>
                <ContentText>{note?.writer} </ContentText>{" "}
              </ContentRight>
            </Content>
            <Content>
              <ContentLeft>
                <IconCalendar />
                <MenuName>마감일</MenuName>
              </ContentLeft>
              <ContentRight>
                <Tag style={{ fontWeight: "bold" }} dateDiff={dateDiff}>
                  {deadline}
                </Tag>
              </ContentRight>
            </Content>
            <Content>
              <ContentLeft>
                <IconCalendar />
                <MenuName>상태</MenuName>
              </ContentLeft>
              <ContentRight>
                <Labels type={note?.step}>{note?.step}</Labels>
              </ContentRight>
            </Content>
            <Content>
              <ContentLeft>
                <IconLink width="24" height="24" fill="#767676" />
                <MenuName>첨부파일</MenuName>
              </ContentLeft>
              <ContentRight style={{ verticalAlign: "top" }}>
                <ul>
                  {files.map((file, index) => (
                    <List key={index}>
                      {index + 1}.<a href={file.fileUrl}>{file.fileName}</a>
                    </List>
                  ))}
                </ul>
              </ContentRight>
            </Content>

            <Content style={{ border: "none" }}>
              <ContentLeftLast>
                <IconNote /> <MenuName>할 일</MenuName>
              </ContentLeftLast>
              <ContentRight>{note?.content}</ContentRight>
            </Content>
          </DetailContent>
          <LastContent>
            <div>최초 작성일 : {createdAt}</div>
            <div>{hourDiff < -22 ? <p>{updated}</p> : <p>마지막 수정: {recentlyUpdated}</p>}</div>
          </LastContent>
        </NoteDetailInner>
        <CommentList comment={showCmt} history={history} match={match} projectId={projectId} />
      </NoteDetailWrap>
      <BottomButton>
        {/* buttons - edit */}
        <Button>
          <ModalEditing modalType="editing" note={note} />
        </Button>
        {/* buttons - delete */}
        <Button onClick={deleteNote}>
          <Trash2 />
        </Button>
        {/* buttons - bookmark */}
        {!isBookmark ? (
          <Button onClick={addBookmark}>
            <Bookmark />
          </Button>
        ) : (
          <Button onClick={deleteBookmark}>
            <Bookmark fill="#387E4B" stroke="#387E4B" />
          </Button>
        )}
        {/* buttons - comment */}
        <Button onClick={() => setShowCmt(!showCmt)}>
          <MessageCircle />
        </Button>
      </BottomButton>
    </div>
  );
};

const List = styled.li`
  @media (max-width: 768px) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 150px;
  }
`;

const BottomButton = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
  @media (max-width: 768px) {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-top: 20px;
    background-color: #f9f9f9;
  }
`;

const ContentText = styled.p`
  font-size: 16px;
  letter-spacing: -0.03em;
  color: #191919;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
const NoteDetailWrap = styled.div`
  display: flex;
  width: 100%;
  overflow-y: auto;
  @media (max-width: 768px) {
    flex-direction: column;
    height: 95%;
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e1ede4;
    border: 5px solid #e1ede4;
    border-top-left-radius: 50px;
    border-bottom-right-radius: 50px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
const NoteDetailInner = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: rem(20);
  box-shadow: rem(2) rem(4) rem(20) rgba(25, 25, 25, 0.1);
  overflow-y: auto;
  border-radius: 15px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 8px 0px;
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e1ede4;
    border: 5px solid #e1ede4;
    border-top-left-radius: 50px;
    border-bottom-right-radius: 50px;
  }
`;
const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const TopRight = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const InnerButton = styled.div`
  display: flex;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Button = styled.div`
  margin: 0px 15px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: #387e4b;
  &:hover {
    color: #191919;
  }
  &::after {
    content: "|";
    float: right;
    color: #dadada;
    margin-right: -1rem;
  }
  &:last-child::after {
    content: "";
  }
`;
const ProjectTitle = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Content = styled.div`
  vertical-align: middle;
  display: flex;
  overflow: auto;
  padding: 10px 0px;
  border-bottom: 1px solid #ededed;
`;

const MenuName = styled.div`
  margin: 0px 15px;
`;
const ContentLeft = styled.div`
  vertical-align: middle;
  display: flex;
  margin: 0px 10px;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: -0.03em;
  color: #767676;
  width: 150px;
  @media (max-width: 768px) {
    margin: 0px;
    font-size: 14px;
    width: 160px;
  }
`;
const ContentLeftLast = styled.div`
  vertical-align: middle;
  display: flex;
  margin: 0px 10px;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: -0.03em;
  color: #767676;
  width: 150px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const ContentRight = styled.div`
  width: 85%;
  vertical-align: middle;
  display: flex;
  word-break: break-all;
  white-space: normal;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  @media (max-width: 768px) {
    width: 100%;
    font-size: 14px;
  }
`;

const LastContent = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #767676;
  margin: 10px;
`;

const Tag = styled.div`
  display: inline-block;
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
