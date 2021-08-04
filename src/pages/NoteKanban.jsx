import React from "react";
import styled, { css } from "styled-components";
import { t } from "../util/remConverter";
/* components */
import { Template, KanbanList, SubHeader } from "../components";

const NoteKanban = ({ history }) => {
  return (
    <>
      {/* <Template /> */}
      <SubHeader />
      <Wrapper>
        <KanbanList />
        <KanbanList />
        <KanbanList />
        <KanbanList />
        <KanbanList />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div(
  ...t`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  white-space: nowrap;
  overflow-x: scroll;
  display: flex;
  flex-direction: row;
`,
);

export default NoteKanban;
