import React from "react";
import styled from "styled-components";
import { ProjectModal } from "..";

import ProjectJoin from "../modals/ProjectJoin";
import { ReactComponent as NoneProject } from "../../styles/images/NoneProject.svg";
import { ReactComponent as PlanBetterStartEasier } from "../../styles/images/PlanBetter_StartEasier.svg";
const EmptyProject = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <CenterWrap>
        <CenterBox>
          <NoneProject />
          <PlanBetterStartEasier style={{ margin: "20px 0px 0px 50px" }} />
          <CenterText>
            <p style={{ marginRight: "5px" }}>세상에서 제일 쉬운 협업툴 PandaN으로</p> 프로젝트를 관리하세요!
          </CenterText>
        </CenterBox>
        <CenterBtn>
          <ProjectJoin />
          <ProjectModal />
        </CenterBtn>
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
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const CenterBox = styled.div`
  display: block;
  margin: auto;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterBtn = styled.div`
  display: flex;
  margin: 50px auto;
  width: 700px;
  @media (max-width: 600px) {
    flex-direction: column;
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
    flex-direction: column;
  }
`;

export default EmptyProject;
