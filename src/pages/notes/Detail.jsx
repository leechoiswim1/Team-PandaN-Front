import React from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";

/* == Custom - Component */
import { Template, ProjectHeader, ProjectMenu, NoteDetail, CommentList } from "../../components";

// * == ( note - Detail ) -------------------- * //
const Detail = ({ history, match, ...rest }) => {
  const projectId = match.params.projectId;
  return (
    <Template>
      <div className="content" id="content">
        <ProjectHeader match={match} />
        <ProjectMenu history={history} match={match} projectId={projectId} />
        <div className="note-detail-container">
          <DetailInner>
            <NoteWrap>
              <NoteDetail history={history} match={match} projectId={projectId} />
            </NoteWrap>
            <div>
              <CommentList history={history} match={match} projectId={projectId} />
            </div>
          </DetailInner>
        </div>
      </div>
    </Template>
  );
};

const DetailInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  // @media (max-width: 800px) {
  //   display: block;
  // }
`;

const NoteWrap = styled.div`
  width: 100%;
  height: 100%;
  max-height: 1600px;
  min-height: 400px;
`;
export default Detail;
