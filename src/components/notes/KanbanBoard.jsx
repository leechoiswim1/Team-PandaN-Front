import React, { useEffect, useState }   from "react";

/* == Library - style */
import styled, { css }                  from "styled-components";
import { t }                            from "../../util/remConverter";

/* == Library - drag & drop */
import { DragDropContext, Droppable}    from "react-beautiful-dnd";

/* == Custom - Component */
import { KanbanList, WritingNoteModal } from "..";

/* == Custom - Icon */
import { ReactComponent as Write }      from "../../styles/images/ico-kanban-write.svg";
import { ReactComponent as Arrow }      from "../../styles/images/ico-kanban-col-footer-arrow.svg";
import IconSteps                        from "../../elements/IconSteps";

/* == Redux - actions */
import { useSelector, useDispatch }     from "react-redux";
import { noteActions }                  from "../../modules/note";

// * == ( kanban / Board ) -------------------- * //
const KanbanBoard = ({ history, match }) => {
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
          notes: _notes,
        },
      };

      //배열로 만들고 store 저장
      const _newState = Object.values(newState);
      dispatch(noteActions.setKanbanStep(_newState));
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
      const newNote = { ...note, step: destinationStep.step };
      // 새 array 에 넣기
      _destinationNoteList.splice(destination.index, 0, newNote);

      const newState = {
        ...projects,
        [source.droppableId]: {
          ...sourceStep,
          notes: _sourceNoteList,
        },
        [destination.droppableId]: {
          ...destinationStep,
          notes: _destinationNoteList,
        },
      };

      // 배열로 만들고 store 저장
      const _newState = Object.values(newState);
      dispatch(noteActions.setKanbanStep(_newState));
      dispatch(noteActions.__editNote(draggableId, newNote));
    }
  };

  const projects = useSelector((state) => state.note.list)
  const projectId = match.params.projectId;

  const [modalVisible, setModalVisible] = useState(false)
  const openModal = () => {
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result, projects)}>
      {projects.map((project, index) => {
        return (
          <div key={index}>
            <Droppable droppableId={String(index)}>
              {(provided, snapshot) => {
                return ( 
                  <div className="kanban-column"> 
                    <div className="kanban-col-header">
                      <div className="kanban-col-title">
                        <IconSteps type={project.step}/> 
                        <span>{project.step}</span>
                        <Badge className="kanban-col-badge" type={project.step}>
                          {project.notes?.length}
                        </Badge>
                      </div>
                      <div>
                        <Write 
                          fill="#767676"
                          onClick={openModal}
                          width="20"
                          height="20"
                        />
                          { modalVisible && 
                            <WritingNoteModal
                              projectId={projectId}
                              visible={modalVisible}
                              closable={true}
                              maskClosable={true}
                              onClose={closeModal} />
                          }                        
                      </div>
                    </div>
                  
                  <div className="kanban-col-content"
                    ref={provided.innerRef}
                    isdraggingover={snapshot.isdraggingover}
                    {...provided.droppableProps}                    
                  >  
                    <KanbanList notes={project.notes} step={project.step} history={history} projectId={projectId}/>
                    {provided.placeholder}
                  </div>
                  <ColFooter className="kanban-col-footer" type={project.step} >
                    <div onClick={openModal}>
                      <Write 
                        fill="#767676"
                        type={project.step} 
                        width="18" 
                        height="18"
                      />
                      <span>할 일 만들기</span>
                    </div>
                  </ColFooter>                   
                  </div>
                );
              }}
            </Droppable>
          </div>
        );
      })}
    </DragDropContext>
  );
};

const Badge = styled.div`
${(props) => (props.type === "STORAGE") && 
  css`  
    background-color: #FFCD40;
  `}
${(props) => (props.type === "TODO") && 
  css`  
    background-color: #ADBE4F;
  `}
${(props) => (props.type === "PROCESSING") && 
css`  
  background-color: #9BD09C;
`}
${(props) => (props.type === "DONE") && 
  css`  
    background-color: #F5DAAE;
  `}
`

const ColFooter = styled.div`
${(props) => (props.type === "STORAGE") && 
  css`  
    background-color: rgba(255, 205, 64, 0.3);
  `}
${(props) => (props.type === "TODO") && 
  css`  
    background-color: rgba(173, 190, 79, 0.3);
  `}
${(props) => (props.type === "PROCESSING") && 
css`  
  background-color: rgba(155, 208, 156, 0.3);
`}
${(props) => (props.type === "DONE") && 
  css`  
    background-color: rgba(245, 218, 174, 0.3);
  `}
  /* & svg {
    ${(props) => (props.type === "STORAGE") && 
      css`  
       fill: #FFBD04;
      `}
    ${(props) => (props.type === "TODO") && 
      css`  
        fill: #ADBE4F;
      `}
    ${(props) => (props.type === "PROCESSING") && 
    css`  
      fill: #9BD09C;
    `}
    ${(props) => (props.type === "DONE") && 
      css`  
        fill: #F5DAAE;
      `}
  } */
`

export default KanbanBoard;
