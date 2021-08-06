import React from "react";
/* == Library - style */
import styled from "styled-components";
import { t }  from "../../util/remConverter";

const InnerHeader = ({ history }) => {
  return (
    <Wrapper fluid> 
      <nav>
        <Tab href="javascript:void(0);">칸반</Tab>
        <Tab href="javascript:void(0);">목록</Tab>
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
