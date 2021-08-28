import React from "react";
import moment from "moment";
import "moment/locale/ko";
import styled from "styled-components";
import { Bookmark, FileText } from "react-feather";
import { useSelector } from "react-redux";
import { history } from "../../modules/configStore";
import { ProjectModal, ProjectModalEdit, LeaveProject } from "..";

const ProjectCardList = () => {
  const project_list = useSelector((state) => state.project.list);

  return (
    <>
      <p style={{ margin: "20px 35px", fontSize: "20px", fontWeight: "700" }}>
        전체 프로젝트
        <span style={{ fontSize: "14px", fontWeight: "700", color: "#BCBCBC" }}> Total {project_list.length}</span>
      </p>

      <Wrapper>
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
                      onClick={() => {
                        history.push(`/projects/${p.projectId}/kanban`);
                      }}
                    >
                      {p.title}
                    </Title>
                    {p.isUpdatableAndDeletable ? <ProjectModalEdit main="main" projectId={p.projectId} title={p.title} detail={p.detail} /> : ""}
                  </div>
                  <div
                    style={{ marginTop: "15px", cursor: "pointer" }}
                    onClick={() => {
                      history.push(`/projects/${p.projectId}/kanban`);
                    }}
                  >
                    <Detail style={{ color: "#9BD09C", fontWeight: "700" }}>{p.detail}</Detail>
                    {/* 1. 최근 노트 수정일자가 있는지(신규 생성 프로젝트는 노트 수정일자 없음) ?
                      2. 있다면 시간 차 23시간 이상인지 ?
                        format 1, 수정한 지 하루 경과했을 경우 : YYYY.MM.DD hh:mm : 
                        format 2, 수정한 지 하루 이내일 경우 : 'n 분 전, n 시간 전' :
                        수정일자가 없을 경우 아무 것도 출력하지 않음 */}
                    {p.recentNoteUpdateDate ? (
                      hourDiff < -23 ? (
                        <Detail>마지막 수정: {modifiedAt}</Detail>
                      ) : (
                        <Detail>마지막 수정: {recentlyUpdated}</Detail>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div style={{ height: "50%" }} />

                <Footer style={{ justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", float: "left" }}>
                    <Bookmark fill="#fff" stroke="#767676" style={{ width: "20px", height: "20px" }} />
                    <DetailText>{p.bookmarkCount}</DetailText>
                    <FileText fill="#fff" stroke="#767676" style={{ width: "20px", height: "20px", marginLeft: "10px" }} />
                    <DetailText>{p.noteCount}</DetailText>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "60px", height: "20px" }}>
                      <div style={{ width: "20px", height: "20px", display: "flex" }}>
                        {crewProfiles.map((c, idx) => {
                          const http = c.substring(0, 4);

                          return (
                            <React.Fragment key={idx}>
                              {http === "http" ? (
                                <img src={c} style={{ width: "20px", height: "20px", borderRadius: "10px" }} alt="crew" />
                              ) : (
                                <img
                                  src="https://s3.ap-northeast-2.amazonaws.com/front.blossomwhale.shop/ico-user.svg"
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "10px",
                                  }}
                                  alt="crew"
                                />
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                    <div style={{ display: "fixed" }}>{crewcount > 0 ? <p>+{crewcount} </p> : ""}</div>
                  </div>
                </Footer>
              </Item>
            );
          })}
          <ProjectModal main="main" />
        </Wrap>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin: 20px 30px;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  @media (max-width: 720px) {
    width: 100%;
    margin: auto;
    justify-content: center;
  }
`;

const Wrap = styled.div`
  width: 95%;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow-x: hidden;
  @media (max-width: 720px) {
    width: 90%;
    justify-content: center;
  }
`;
const Item = styled.div`
  min-width: 280px;
  width: 400px;
  height: 280px;
  margin: 10px;
  padding: 25px;
  background-color: #fff;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 20px;
  align-content: space-between;
  filter: drop-shadow(2px 4px 10px rgba(25, 25, 25, 0.1));

  @media (max-width: 1360px) {
    width: 30%;
  }
  @media (max-width: 900px) {
    width: 40%;
  }
  @media (max-width: 720px) {
    width: 80%;
    justify-content: center;
  }
  &:hover {
    border: 2px solid #fff;
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #191919;
  cursor: pointer;
  max-width: 88%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  &:hover {
    color: #387e4b;
  }
`;
const Detail = styled.div`
  font-size: 1rem;
  color: #bcbcbc;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

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
