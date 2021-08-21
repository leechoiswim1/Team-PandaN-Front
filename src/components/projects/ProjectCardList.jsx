import React from "react";
import moment from "moment";
import "moment/locale/ko"
import styled, { css } from "styled-components";
import { t } from "../../util/remConverter";
import { Bookmark, FileText } from "react-feather";
import { useSelector } from "react-redux";
import { history } from "../../modules/configStore";

import { ReactComponent as IconEdit } from "../../styles/images/icon-comment-edit.svg";
const ProjectCardList = () => {
  const project_list = useSelector((state) => state.project.list);

  
  return (
    <>
      <p style={{ margin: "20px 35px", fontSize: "20px", fontWeight: "700" }}>전체 프로젝트</p>
      <Wrap>
        {project_list.map((p, idx) => {
          const crewProfiles = p.crewProfiles;
          const crewcount = p.crewCount - 3;

          // project에 노트 수정일 정보가 있을 경우 현재로부터 시간 차 구하기
          let hourDiff = p.recentNoteUpdateDate && moment(p.recentNoteUpdateDate).diff(moment(), "hours");
          // format 1, 수정한 지 하루 경과했을 경우 : YYYY.MM.DD hh:mm 
          const modifiedAt = moment(p.recentNoteUpdateDate).format(" YYYY. M. D hh:mm");
          // format 2, 수정한 지 하루 이내일 경우 : 'n 분 전, n 시간 전'
          const recentlyUpdated = moment(p.recentNoteUpdateDate).fromNow();

          if (!crewProfiles) {
            return <div></div>;
          }
          return (
            <Item key={idx}>
              <div style={{ height: "30%" }}>
                <div style={{ justifyContent: "space-between", display: "flex" }}>
                  <Title
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      history.push(`/projects/${p.projectId}/kanban`);
                    }}
                  >
                    {p.title}
                  </Title>
                  <IconEdit
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      history.push("/bookmark");
                    }}
                  />
                </div>
                <div
                  style={{ marginTop: "15px", cursor: "pointer" }}
                  onClick={() => {
                    history.push(`/projects/${p.projectId}/kanban`);
                  }}
                >
                  <Detail style={{ color: "#9BD09C", fontWeight: "700" }}>{p.detail}</Detail>
                  {/* 시간 차 23시간 이상인지 ?
                    format 1, 수정한 지 하루 경과했을 경우 : YYYY.MM.DD hh:mm : 
                    format 2, 수정한 지 하루 이내일 경우 : 'n 분 전, n 시간 전' */}
                  {hourDiff < -22 ? <Detail>마지막 수정: {modifiedAt}</Detail> : <Detail>마지막 수정: {recentlyUpdated}</Detail>}
                </div>
              </div>
              <div style={{ height: "50%" }} />

              <Footer style={{ justifyContent: "space-between", alignItems: "center"}}>
                <div style={{ display: "flex", float: "left" }}>
                  <Bookmark fill="#fff" stroke="#767676" style={{ width: "15px", height: "15px" }} />
                  <DetailText>{p.bookmarkCount}</DetailText>
                  <FileText fill="#fff" stroke="#767676" style={{ width: "15px", height: "15px", marginLeft: "10px" }} />
                  <DetailText>{p.noteCount}</DetailText>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "60px", height: "20px" }}>
                    <div style={{ width: "20px", height: "20px", display: "flex" }}>
                      {crewProfiles.map((c, idx) => {
                        const http = c.substring(0, 4);

                        return (
                          <>
                            {http == "http" ? (
                              <img src={c} style={{ width: "20px", height: "20px", borderRadius: "10px" }} />
                            ) : (
                              <img
                                src="https://e7.pngegg.com/pngimages/287/501/png-clipart-giant-panda-emoji-coloring-book-drawing-sticker-emoji-child-face-thumbnail.png"
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "10px",
                                }}
                                key={idx}
                                alt="crew"
                              />
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>
                  <div style={{ display: "fixed" }}>{crewcount > 0 ? <p>외 {crewcount}명 </p> : ""}</div>
                </div>
              </Footer>
            </Item>
          );
        })}
      </Wrap>
    </>
  );
};

const Item = styled.div(
  ...t`
   
  width: 400px;
  height:300px;
  margin: 20px;
  padding: 25px;
  background-color: #fff; 
  overflow:hidden;
  box-sizing: border-box;
  border-radius:20px;
  align-content: space-between;
  filter: drop-shadow(2px 4px 10px rgba(25, 25, 25, 0.1));
 
  @media (max-width: 1360px) {
    width: 30%;
  }
  @media (max-width: 900px) {
    width: 50%;
  }
  @media (max-width: 720px) {
    width: 90%;
  }
`,
);

const Wrap = styled.div(
  ...t`
  width:100%;
  height:100%;
  overflow:hidden;
  margin:20px 30px ;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  
`,
);

const Title = styled.p(
  ...t`
  font-size:1.25rem;
  font-weight:700;
  color:#191919;
  letter-spacing: -0.03rem;
`,
);

const Detail = styled.p(
  ...t`
 
  font-size:1.0rem;
  color: #BCBCBC;
  font-weight: 500;
  letter-spacing: -0.03rem;
`,
);

const DetailText = styled.p`
  color: #767676;
  font-weight: 600;
  line-height: 18.75px;
  font-size: 16px;
`;
const Footer = styled.div`
  height: 20%;
  width: 100%;
  display: flex;
`;

export default ProjectCardList;
