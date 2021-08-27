import React from "react";

/* == Library - style */
import styled, { css } from "styled-components";

// * == ( Labels ) -------------------- * //
const Labels = ({ type, dateDiff, badge, children }) => {
  /**
   * props : type(str), dateDiff(int)
   * type === "STORAGE" || "TODO" || "PROCESSING" || "DONE" ; 각 해당 스텝에 따라 다른 색상의 레이블 출력
   * dateDiff ; deadline이 오늘 날짜를 지났을 경우(-1보다 작을 경우) 레이블 텍스트 컬러 붉은색으로 출력
   */

  if (badge) {
    return (
      <Tag className="note-issue-badge" type={type}>
      </Tag>
    )    
  }
  
  return (
    <Tag className="note-step-label" type={type} dateDiff={dateDiff}>
      {children}
    </Tag>
  );
};

const Tag = styled.div`
${(props) => (props.type === "STORAGE") && 
  css`  
    background-color: #FFCD40;
  `}
${(props) => (props.type === "TODO") && 
  css`  
    background-color: #ADBE4F;
  `}
${(props) => (props.type === "PROCESSING") && 
css`  
  background-color: #9BD09C;
`}
${(props) => (props.type === "DONE") && 
  css`  
    background-color: #F5DAAE;
  `}
  color: ${(props) => props.dateDiff <= -1 ? "#dc3545" : "#fff"};
`

export default Labels;