import React  from "react";
/* == Library - style */
import styled from "styled-components";
import { t }  from "../../util/remConverter";
/* == Custom - Component */
import { IssueCard } from "..";

// * == ( IssueList / Note ) -------------------- * //
const IssueList = ({ history, notes, projectId, ...rest }) => {
  return (
    <>
      {notes.map((note, index) => {
        return (
          <IssueCard
            key={index}             
            projectId={projectId}
            noteId={note.noteId}
            title={note.title}
            content={note.content}
            deadline={note.deadline}
            step={note.step}
            type={rest.type}
          />
        );
      })}
    </>
  );
};

export default IssueList;