import React from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
/* == Library - drag & drop */
import { Draggable } from "react-beautiful-dnd";
/* == Custom - Component */
import { KanbanCard } from "..";

// * == ( kanban / NoteList ) -------------------- * //
const KanbanList = ({ notes, history, ...rest }) => {
  if (!notes) {
    return <div />;
  }
  return (
    <React.Fragment>
      {notes.map((note, index) => {
        const noteId = note?.noteId;
        return (
          <Draggable draggableId={String(noteId)} key={noteId} index={index}>
            {(provided, snapshot) => {
              return (
                <CardWrapper
                  ref={provided.innerRef}
                  isDragging={snapshot.isDragging}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  onClick={() => {
                    history.push(`/projects/60/notes/${noteId}`);
                  }}
                >
                  <KanbanCard note={note} />
                </CardWrapper>
              );
            }}
          </Draggable>
        );
      })}
    </React.Fragment>
  );
};

const CardWrapper = styled.div(
  ...t`
  min-height: 50px;
  padding: 16px;
  margin-bottom: 8px;
  user-select: none;
  cursor: grab;
  border: 
    ${props => (props.isDragging ? "1px solid #b2c0b6" : "1px solid #ddd")};
  background-color: 
    ${props => (props.isDragging ? "#eee" : "#fff")};
`,
);

export default KanbanList;
