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
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ width: "500px" }}>
              <NoteDetail history={history} match={match} projectId={projectId} />
            </div>
          </div>
          <div>
            <CommentList history={history} match={match} projectId={projectId} />
          </div>
        </div>
      </div>
    </Template>
  );
};

export default Detail;
