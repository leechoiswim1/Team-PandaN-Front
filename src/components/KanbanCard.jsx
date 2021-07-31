import React from "react";
import styled, { css } from "styled-components";
import { t } from "../util/remConverter";

const KanbanCard = ({ history }) => {
  return (
    <Item>
      <h5>제목</h5>
      <p>설명</p>
      <p>언제까지 끝내기</p>
    </Item>     
  );
};

const Item = styled.div(...t`
  width: 100%; 
  height: auto;
  margin-top: 16px;
  padding: 16px;
  background-color: #fff; 
`)

export default KanbanCard;