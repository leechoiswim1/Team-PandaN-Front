import React from "react";

import styled from "styled-components";
import _ from "lodash";

/* == Custom - Component */
import { ProjectModal } from "..";
import ProjectJoin from "../modals/ProjectJoin";

/* == Custom - Icon */
import PandaEmpty from "../../styles/images/Panda_EmptyProject.svg";
import PlanBetterStartEasier from "../../styles/images/PlanBetter_StartEasier.svg";
import { ReactComponent as IconGuide } from "../../styles/images/ico-guide.svg";

// * == (EmptyProject) -------------------- * //
import { useDispatch } from "react-redux";
import { actionCreators as projectActions } from "../../modules/project";
import { history } from "../../modules/configStore";

const EmptyProject = () => {
  const dispatch = useDispatch();

  const getGuideProject = _.debounce(() => {
    dispatch(projectActions.__getGuideProject());
  }, 100);

  return (
    <Background>
      <CenterWrap>
        <CenterBox>
          <PandaEmptyImg src={PandaEmpty} alt={PandaEmpty} />
          <PlanBetterStartEasierImg src={PlanBetterStartEasier} alt={PlanBetterStartEasier} />
          <CenterText>
            세상에서 제일 쉬운 협업툴 <span style={{ color: "#387E4B", fontWeight: "700" }}>PandaN</span>으로 프로젝트를 관리하세요!
          </CenterText>
          <CenterBtn>
            {/* <ProjectJoin />
            <ProjectModal /> */}
            <GuideBtn className="btn-main" onClick={getGuideProject}>
              <IconGuide />
              <p>
                세상에서 제일 쉽게 <span>PandaN</span>하기!
              </p>
            </GuideBtn>
          </CenterBtn>
        </CenterBox>
      </CenterWrap>
    </Background>
  );
};

const GuideBtn = styled.div`
  background-color: #d9e9d9;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  &:hover {
    background-color: #387e4b;
  }

  p {
    margin-left: 10px;
  }
  span {
    color: #387e4b;
  }

  &:hover {
    span {
      color: #ffffff;
    }
    svg {
      animation: spin 7s linear infinite;
      animation-delay: 0;
      @keyframes spin {
      from {
          transform: rotate(0);
      }
      to {
          transform: rotate(360deg);
      }
    }
  }
`;

const Background = styled.div`
  width: 90vw;
  height: 90vh;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const CenterWrap = styled.div`
  display: flex;
  position: relative;
  width: 90%;
  height: 100%;
  margin-left: 0px;
  @media (max-width: 767px) {
    margin: auto;
  }
`;

const CenterBox = styled.div`
  display: block;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const PandaEmptyImg = styled.img`
  width: 454px;
  height: 336px;
  @media (max-width: 767px) {
    height: 70%;
  }
`;
const PlanBetterStartEasierImg = styled.img`
  margin: 20px 0px;
  width: 781px;
  height: 36px;
`;
const CenterBtn = styled.div`
  display: flex;
  margin: 25px auto;

  @media (max-width: 767px) {
    max-width: 250px;
    margin: 12px;
  }
`;
const CenterText = styled.div`
  color: #767676;
  font-weight: 500;
  font-size: 22px;
  line-height: 36px;
  display: flex;
  @media (max-width: 767px) {
    display: none;
  }
`;

export default EmptyProject;
