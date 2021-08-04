import React from "react";
/* styled-components 및 rem 변환 모듈 */
// import styled, { css } from "styled-components";
// import { AlignRight } from "react-feather";
// import { t } from "../util/remConverter";

import { KanbanList, ProjectCardList } from "./";
import { useSelector } from "react-redux";

const Contents = props => {
  const project_list = useSelector(state => state.project.list);
  return (
    <div>{project_list.length > 0 ? <KanbanList /> : <ProjectCardList />}</div>
  );
};

export default Contents;
