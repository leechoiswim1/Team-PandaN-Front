import React  from "react";
/* == Library - style */
import styled from "styled-components";
import { t }  from "../../util/remConverter";

// * == ( kanban / Note ) -------------------- * //
const KanbanCard = ({ note, ...rest }) => {
  return (
    <>
      <h4>{note.title}</h4>
      <p>{note.content}</p>
      <p>{note.deadline}</p>
    </>
  );
};

export default KanbanCard;