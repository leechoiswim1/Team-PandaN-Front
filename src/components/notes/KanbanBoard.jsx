import React, { useEffect, useState } from "react";
/* == Library - style */
import styled from "styled-components";
import { t }  from "../../util/remConverter";
/* == Library - drag & drop */
import { DragDropContext, Droppable}  from "react-beautiful-dnd";
/* == Custom - Component */
import { KanbanList, EditorModal } from "..";
/* == Redux - actions */
import { useSelector, useDispatch }   from 'react-redux';
import { noteActions }                from '../../modules/note';

// * == ( kanban / Board ) -------------------- * //
const KanbanBoard = ({ history }) => {
  const dispatch = useDispatch();
    
  /* == function */
  const onDragEnd = (result, projects) => {
    const { source, destination, draggableId } = result;
    // droppable 영역 밖에다 떨어뜨렸을 경우, 시작한 위치로 돌아올 경우
    // destination 이 null 일 경우 return;
    if (!destination) return;

    // note를 동일한 step status 내에서 움직여 순서만 바꿀 경우
    if (source.droppableId === destination.droppableId) {
      // const sourceStep = steps.find(step => step.step === source.droppableId);
      const sourceStep = projects[source.droppableId];     
      const _notes = [...sourceStep.notes];
      // array 기존 위치에서 삭제 후
      const [note] = _notes.splice(source.index, 1);
      // array 새 위치에 넣기
      _notes.splice(destination.index, 0, note);
      const newState = {
        ...projects,        
        [source.droppableId]: {
          ...sourceStep,
          notes: _notes
        }
      }

      //배열로 만들고 store 저장
      const _newState = Object.values(newState)
      dispatch(noteActions.setKanbanStep(_newState))
    }

    // note의 기존 step status와 drop 이후의 step status가 다를 경우
    if (source.droppableId !== destination.droppableId) {
      const sourceStep = projects[source.droppableId];
      const destinationStep = projects[destination.droppableId];  
      // const sourceStep = steps.find(step => step.step === source.droppableId);
      // const destinationStep = steps.find(step => step.step === destination.droppableId);
      const _sourceNoteList = [...sourceStep.notes];
      const _destinationNoteList = [...destinationStep.notes];
      // 기존 array 에서 삭제 후
      const [note] = _sourceNoteList.splice(source.index, 1);
      // note의 step 바꿔주고
      const newNote = {...note, step: destinationStep.step};
      // 새 array 에 넣기
      _destinationNoteList.splice(destination.index, 0, newNote);

      const newState = {
        ...projects,
        [source.droppableId]: {
          ...sourceStep,
          notes: _sourceNoteList
        },
        [destination.droppableId]: {
          ...destinationStep,
          notes: _destinationNoteList
        }
      }
      
      // 배열로 만들고 store 저장
      const _newState = Object.values(newState)
      dispatch(noteActions.setKanbanStep(_newState))
      dispatch(noteActions.__editNote(draggableId, newNote))
    }  }

  const projects = useSelector((state) => state.note.list)

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result, projects,)}>
      {/* {Object.entries(steps).map(([stepsId, step], index) => { */}
      {projects.map((project, index) => {
        return (
          <div key={project.step}>                        
            <Droppable droppableId={String(index)}>
              {(provided, snapshot) => {
                return ( 
                  <StepColumn> 
                  <h4>{project.step}</h4>
                  <EditorModal />
                  <ListWrapper
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}
                    {...provided.droppableProps}                    
                  >  
                    <KanbanList notes={project.notes} history={history}/>
                    {provided.placeholder}
                  </ListWrapper>                   
                  </StepColumn>
                );
              }}
            </Droppable>         
          </div>
        );
      })}
    </DragDropContext>
  );
};

const StepColumn = styled.div(...t`
  height: auto;
  margin-right: 16px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`);

const ListWrapper = styled.div(...t`
  width: 360px;
  min-height: 50px; 
  margin-top: 8px;
  user-select: none;
`);

export default KanbanBoard;