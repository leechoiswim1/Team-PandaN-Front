import React from "react";
import styled, { css } from "styled-components";
import { t } from "../util/remConverter";

const KanbanList = ({ history }) => {
  return (
    <List>
      <h4>노트 상태</h4>
      <h4>note 1</h4>
      <h4>note 2</h4>
      <h4>note 3</h4>
    </List>     
  );
};

const List = styled.div(...t`
  min-width: 400px;
  height: auto;
  margin-right: 16px;
  padding: 16px;
  background-color: #eee;  
`)

export default KanbanList;
