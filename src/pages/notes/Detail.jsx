import React from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
import { Accordion } from "react-bootstrap";
/* == Custom - Component */
import {
  Template,
  ProjectHeader,
  InnerHeader,
  NoteDetail,
  CommentList,
} from "../../components";

// * == ( note - Detail ) -------------------- * //
const Detail = ({ history, match, ...rest }) => {
  const projectId = match.params.projectId;
  return (
    <Template>
      <div className="content" id="content">
        <ProjectHeader />
        <InnerHeader projectId={projectId} />
        <Container>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div style={{ width: "500px" }}>
              <NoteDetail
                history={history}
                match={match}
                projectId={projectId}
              />
            </div>
          </div>
          <div>
            {/* <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>댓글</Accordion.Header>
                  <Accordion.Body> */}
            <CommentList />
            {/* </Accordion.Body>
              </Accordion.Item>
            </Accordion> */}
          </div>
        </Container>
      </div>
    </Template>
  );
};

const Container = styled.div(
  ...t`
  width: 100%;
  height: calc( 100% - 120px );
  padding: 0 36px;
  white-space: nowrap;
  overflow-x: scroll;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`,
);

export default Detail;
