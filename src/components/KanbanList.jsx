import React from "react";
import styled, { css } from "styled-components";
import { t } from "../util/remConverter";
/* components */
import { KanbanCard } from "../components";

const KanbanList = ({ history }) => {
  return (
    <List>
      <h4>노트 상태</h4>
      <KanbanCard />
      <KanbanCard />
      <KanbanCard />
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
