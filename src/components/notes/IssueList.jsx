import React  from "react";
/* == Library - style */
import styled from "styled-components";
import { t }  from "../../util/remConverter";
/* == Custom - Component */
import { IssueCard } from "..";

// * == ( IssueList / Note ) -------------------- * //
const IssueList = ({ history, ...rest }) => {
  return (
    <>
      <IssueCard />
      <IssueCard />
      <IssueCard />
      <IssueCard />
      <IssueCard />
      <IssueCard />
      <IssueCard />
      <IssueCard />
      <IssueCard />
      <IssueCard />
      <IssueCard />
      <IssueCard />
      <IssueCard />
      <IssueCard />
    </>
  );
};

export default IssueList;