import React from "react";
/* == Library - style */
import styled from "styled-components";
import { t }  from "../util/remConverter";

const SubHeader = ({ history }) => {
  return (
    <Wrapper> 
      <div>
        프로젝트 제목 / 프로젝트 설명
      </div>
      <div>
        <Tab href="javascript:void(0);">멤버 초대</Tab>
        <Tab href="javascript:void(0);">참여 멤버</Tab>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div(...t`
  width: 100%;
  height: 60px;
  padding: 0 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  box-sizing : border-box;
`)

const Tab = styled.a(...t`
  text-decoration: none;
  position: relative;
  margin: 0 0 0 20px;
  cursor: pointer;   
`)

export default SubHeader;
