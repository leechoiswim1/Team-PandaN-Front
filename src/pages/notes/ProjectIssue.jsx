import React  from "react";
/* == Library - style */
import styled from "styled-components";
import { t }  from "../../util/remConverter";
/* == Custom - Component */
import { Template, SubHeader, InnerHeader, IssueList } from "../../components";

// * == ( note - Issue ) -------------------- * //
const ProjectIssue = ({ history, match, ...rest }) => {
  return (
    <Template>
      <div className="content">
        <SubHeader />
        <InnerHeader />
        <Container>
          <IssueList history={history}/>
        </Container>
      </div>
    </Template>
  );
};

const Container = styled.div(...t`
  width: 100%;
  height: calc( 100% - 120px );
  padding: 0 36px;
  overflow: auto;
`)

export default ProjectIssue;
