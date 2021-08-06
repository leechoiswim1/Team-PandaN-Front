import React from "react";
/* == Library - style */
import styled from "styled-components";
import { t }  from "../../util/remConverter";

const InnerHeader = ({ history, match, projectId, ...rest }) => {
  return (
    <Wrapper fluid> 
      <nav>
        <Tab href={`/projects/${projectId}`}>KANBAN</Tab>
        <Tab href={`/projects/${projectId}/issue`}>ISSUE</Tab>
        <Tab href={`/projects/${projectId}/myissue`}>MY ISSUE</Tab>
      </nav>
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
  margin: 0 20px 0 0;
  cursor: pointer;   
`)

export default InnerHeader;
