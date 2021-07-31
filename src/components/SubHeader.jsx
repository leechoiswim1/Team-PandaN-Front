import React from "react";
import styled, { css } from "styled-components";
import { t } from "../util/remConverter";
// import { Container, Row, Col } from "react-bootstrap";

const SubHeader = ({ history }) => {
  return (
    <Wrapper fluid> 
      <div>
        <nav>
          <Tab href="javascript:void(0);">칸반</Tab>
          <Tab href="javascript:void(0);">목록</Tab>
        </nav>
      </div>
      <div>
        <Tab href="javascript:void(0);">초대</Tab>
        <Tab href="javascript:void(0);">참여</Tab>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div(...t`
  width: 100%;
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  box-sizing : border-box;
  & a:hover {
    font-weight: 600;
  }  
`)

const Tab = styled.a(...t`
  text-decoration: none;
  position: relative;
  margin: 0px 20px;
  cursor: pointer;   
`)

export default SubHeader;
