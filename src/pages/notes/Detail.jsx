import React, { useState } from "react";
/* == Library - style */
import styled from "styled-components";

/* == Custom - Component */
import { Template, ProjectHeader, ProjectMenu, NoteDetail, Spinner } from "../../components";
/* == Redux */
import { useSelector } from "react-redux";

// * == ( note - Detail ) -------------------- * //
const Detail = React.memo(({ history, match, ...rest }) => {
  const projectId = match.params.projectId;
  const isLoading = useSelector((state) => state.noteKanban.isLoading);
  return (
    <Template match={match}>
      <Spinner visible={isLoading} />
      <div className="content" id="content">
        <ProjectHeader match={match} />
        <ProjectMenu history={history} match={match} projectId={projectId} />
        <div className="note-detail-container">
          <DetailInner>
            <NoteWrap>
              <NoteDetail history={history} match={match} projectId={projectId} />
            </NoteWrap>
          </DetailInner>
        </div>
      </div>
    </Template>
  );
});

const DetailInner = styled.div`
  width: 100%;
  // height: 100%;
  display: flex;
  justify-content: space-between;
  // @media (max-width: 800px) {
  //   display: block;
  // }
`;

const NoteWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 1600px;
  min-height: 400px;
`;
export default Detail;
