import React, { useEffect, useState } from "react";

/* == Library - style */
import styled, { css } from "styled-components";
import { t }  from "../util/remConverter";

/* == Custom - Icon */
import { ReactComponent as Google } from "../styles/images/ico-google-button.svg";

const GoogleButton = ({ type }) => {
  return (
    <Button type={type}>
      <p>
        <Google width="18" height="18"/>
        <span style={{fontFamily: "Roboto"}}>Google</span> 계정으로 로그인
      </p>
    </Button>
  );
}

const Button = styled.button`
  margin: 20px 0;
  width: 100%;
  height: 3rem;
  padding: 0.25rem 1rem;
  font-weight: 500;
  font-size: 1.0rem;
  letter-spacing: -0.03rem;
  text-align: center;  
  display: block;
  position: relative;
  cursor: pointer;
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: 1px 1px rgba(25, 25, 25, 0.3);

  /* light button : bg white */
  
  /* color: #757575;
  background-color: #ffffff;
  border: 1px solid #f5f5f5; */
  
  /* dark button : bg blue */
  
  color: #ffffff;
  background-color: #4285f4;
  border: 1px solid #4285f4;
  
  & span {    
    margin-left: 3rem;
  }
  & svg {
    position: absolute;
    margin: 0.25rem 0;
    z-index: 2;
  }
  & ::before {
    content: "";
    position: absolute;
    top: 1px;
    bottom: 1px;
    left: 1px;
    width: 3rem;
    background: #fff;
    border-radius: 2px;
    z-index: 1;
  }
`

export default GoogleButton;