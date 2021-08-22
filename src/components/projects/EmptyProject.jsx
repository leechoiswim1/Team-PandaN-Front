import React from "react";
import styled from "styled-components";
import { ProjectModal } from "..";

import ProjectJoin from "../modals/ProjectJoin";
import PandaEmpty from "../../styles/images/Panda_EmptyProject.svg";
import PlanBetterStartEasier from "../../styles/images/PlanBetter_StartEasier.svg";
const EmptyProject = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <CenterWrap>
        <CenterBox>
          <img src={PandaEmpty} />
          <img src={PlanBetterStartEasier} style={{ margin: "20px 0px" }} />

          <CenterText>
            세상에서 제일 쉬운 협업툴 <span style={{ color: "#387E4B", fontWeight: "700" }}>PandaN</span>으로 프로젝트를 관리하세요!
          </CenterText>
          <CenterBtn>
            <ProjectJoin />
            <ProjectModal />
          </CenterBtn>
        </CenterBox>
      </CenterWrap>
    </div>
  );
};

const CenterWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  left: 60%;
  top: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 1200px) {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  @media (max-width: 1200px) {
    left: 50%;
    top: 55%;
    transform: translate(-50%, -50%);
  }
`;

const CenterBox = styled.div`
  display: block;
  margin: auto;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    width: 70%;
  }
`;

const CenterBtn = styled.div`
  display: flex;
  margin: 50px auto;
  width: 700px;
  @media (max-width: 600px) {
    flex-direction: column;
    max-width: 200px;
    max-height: 150px;
    margin: auto;
  }
`;
const CenterText = styled.div`
  color: #767676;
  font-weight: 500;
  font-size: 22px;
  line-height: 36px;
  margin-top: 10px;
  display: flex;
  @media (max-width: 600px) {
    display: none;
  }
`;

export default EmptyProject;
