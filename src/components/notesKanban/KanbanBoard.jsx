import React, { useEffect, useState } from "react";

/* == Library - Style / Bootstrap / Icon */
import styled, { css, keyframes }     from "styled-components";
import { AlertTriangle }              from "react-feather";

/* == Library - Drag & Drop */
import { DragDropContext, Droppable } from "react-beautiful-dnd";

/* == Library - route */
import { useParams } from "react-router-dom";

/* == Custom - Component & elements */
import { KanbanList, ModalWriting }   from "..";
import IconSteps                      from "../../elements/IconSteps";

/* == Axios - instance 및 api 요청 함수 */
import { noteApi }                    from "../../shared/api";

/* == Redux - actions */
import { useSelector, useDispatch }   from "react-redux";
import { noteKanbanActions }          from "../../modules/noteKanban";


// * == ( Kanban / Board ) -------------------------------- * //
const KanbanBoard = ({ history, match }) => {
  // -----------------------------------------------------------
  // * == hooks
  // -----------------------------------------------------------
  const dispatch = useDispatch();
  const { projectId } = useParams();

  // -----------------------------------------------------------
  // * == subscribe state
  // -----------------------------------------------------------
  const projects = useSelector((state) => state.noteKanban.kanban);

  // -----------------------------------------------------------
  // * == set state
  // -----------------------------------------------------------
  const [ToastStatus, setToastStatus] = useState(false);  

  // -----------------------------------------------------------
  // * == redux-thunk function: REST API Request 
  // error.response 토스트로 띄우기 위해 기존 noteKanban에서 분리
  // -----------------------------------------------------------
  /**
   * __editKanbanStep
   * @param {number} noteId 
   * @param {Object} position 노트의 이동 전 전후 노트, 이동 후 전후 노트, 스텝 
   * 노트 이동 후의 state는 setKanbanStep을 통해 바로 리듀서로 전달하므로 response data를 dispatch 하지 않음
   */
  const __editKanbanStep = (noteId, position) =>
    async (dispatch, getState, { history }) => {
      try {
        const { data } = await noteApi.editKanbanStep(noteId, position);
        // dispatch(editKanbanStep(data.projects));
      } catch (e) {
        console.log(e);
        setToastStatus(true);
      }
    };
  
  // -----------------------------------------------------------
  // * == useEffect
  // case: __editKanbanNote 에러 응답 받았을 때 토스트 메시지 띄움
  // -----------------------------------------------------------
  useEffect(() => {
    if (ToastStatus) {
      setTimeout(() => {
        setToastStatus(false);
      }, 1500);
    }
  }, [ToastStatus]);
    
  // -----------------------------------------------------------
  // * == function
  // -----------------------------------------------------------
  /**
   * onDragEnd
   * @param {*} result drag and drop 이벤트 결과
   * @param {*} projects 해당 프로젝트의 칸반 노트 리스트
   * 칸반 노트 이동 후의 state redux store 저장 및 API put request
   * <DragDropContext /> props 중 ***필수***
   * life cycle 중 맨 마지막, 드래그 이벤트가 끝났을 때의 변동사항 적용 목적
   */
  const onDragEnd = (result, projects) => {    
    // -----------------------------------------------------------
    // * == initialize
    // -----------------------------------------------------------
    const { source, destination, draggableId } = result;

    // -----------------------------------------------------------
    // droppable 영역 밖에다 떨어뜨렸을 경우, 시작한 위치로 돌아올 경우
    // destination 이 null 일 경우 return;
    // -----------------------------------------------------------
    if (!destination) return;

    // -----------------------------------------------------------
    // * == CASE 1
    // note를 동일한 step status 내에서 움직여 순서만 바꿀 경우
    // -----------------------------------------------------------
    if (source.droppableId === destination.droppableId) {
      // const sourceStep = steps.find(step => step.step === source.droppableId);

      // declare: 노트의 기존 step과, 그 해당 스텝에서의 노트 배열
      const sourceStep = projects[source.droppableId];
      const _notes = [...sourceStep.notes];
      
      // 움직인 노트를 array 기존 위치에서 삭제 후
      const [note] = _notes.splice(source.index, 1);
      // array 새 위치에 넣기 (동일한 스텝 내 이동이므로 기존 노트 배열과 새로 들어갈 배열은 동일함)
      _notes.splice(destination.index, 0, note);

      // 새 state를 꾸려줌
      const newState = {
        ...projects,
        [source.droppableId]: {
          ...sourceStep,
          notes: _notes,
        },
      };

      // 새 state: 기존 store에 저장된 구조와 동일하게 배열로 만들어서 dispatch
      const _newState = Object.values(newState);
      dispatch(noteKanbanActions.setKanbanStep(_newState));

      // 스텝 이동 순서 변경 서버로 요청 보내기
      // case 1. 칸반 스텝 최상단 노트 이동할 경우
      // fromNextNoteId / 제자리 이동의 경우가 나머지 경우의 인덱스와 다름
      if (source.index === 0) {
        let fromNextNoteId = _notes[source.index - 1]?.noteId;
        let fromPreNoteId = _notes[source.index]?.noteId;
        let toNextNoteId = _notes[destination.index - 1]?.noteId;
        let toPreNoteId = _notes[destination.index + 1]?.noteId;

        // 해당 noteId 없을 경우 0으로 만들어주기
        if (fromNextNoteId === undefined) { fromNextNoteId = 0; }
        if (fromPreNoteId === undefined) { fromPreNoteId = 0; }
        if (toNextNoteId === undefined) { toNextNoteId = 0; }
        if (toPreNoteId === undefined) { toPreNoteId = 0; }

        // 움직인 노트가 제자리 이동일 때는 return
        if (draggableId === String(fromPreNoteId)) return;

        // 요청 바디 꾸리기
        const position = {
          fromPreNoteId: fromPreNoteId,
          fromNextNoteId: fromNextNoteId,
          toPreNoteId: toPreNoteId,
          toNextNodeId: toNextNoteId, // field명 오타로 보임, toNextNoteId로 보낼 경우 error
          step: sourceStep.step,
        };
        // 바뀐 노트 정보 서버 요청
        dispatch(__editKanbanStep(draggableId, position));
      }

      // case2. 칸반 스텝 최하단 노트 혹은 중간의 노트(움직이는 노트 앞 뒤의 noteId가 존재할 때)를 이동할 경우
      if (source.index === _notes.length - 1 || (_notes[source.index - 1]?.noteId && _notes[source.index + 1]?.noteId)) {
        let fromNextNoteId = _notes[source.index]?.noteId;
        let fromPreNoteId = _notes[source.index + 1]?.noteId;
        let toNextNoteId = _notes[destination.index - 1]?.noteId;
        let toPreNoteId = _notes[destination.index + 1]?.noteId;

        // 해당 noteId 없을 경우 0으로 만들어주기
        if (fromNextNoteId === undefined) { fromNextNoteId = 0; }
        if (fromPreNoteId === undefined) { fromPreNoteId = 0; }
        if (toNextNoteId === undefined) { toNextNoteId = 0; }
        if (toPreNoteId === undefined) { toPreNoteId = 0; }

        // 움직인 노트가 제자리 이동일 때는 return
        if (draggableId === String(fromNextNoteId)) return;

        // 요청 바디 꾸리기
        const position = {
          fromPreNoteId: fromPreNoteId,
          fromNextNoteId: fromNextNoteId,
          toPreNoteId: toPreNoteId,
          toNextNodeId: toNextNoteId,
          step: sourceStep.step,
        };

        // 바뀐 노트 정보 서버 요청
        dispatch(__editKanbanStep(draggableId, position));
      }
    }

    // -----------------------------------------------------------
    // * == CASE 2
    // note의 기존 step status와 drop 이후의 step status가 다를 경우
    // -----------------------------------------------------------
    if (source.droppableId !== destination.droppableId) {
      // const sourceStep = steps.find(step => step.step === source.droppableId);
      // const destinationStep = steps.find(step => step.step === destination.droppableId);

      // declare: 노트의 기존 step / 목적지 step, 각각의 해당 스텝에서의 노트 배열
      const sourceStep = projects[source.droppableId];
      const destinationStep = projects[destination.droppableId];
      const _sourceNoteList = [...sourceStep.notes];
      const _destinationNoteList = [...destinationStep.notes];

      // 움직인 노트를 array 기존 위치에서 삭제 후
      const [note] = _sourceNoteList.splice(source.index, 1);
      // note의 step 바꿔주고 (newNote는 step값이 있으므로 객체여야함)
      const newNote = { ...note, step: destinationStep.step };
      // array 새 위치에 넣기
      _destinationNoteList.splice(destination.index, 0, newNote);

      // 새 state를 꾸려줌
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

      // 새 state: 기존 store에 저장된 구조와 동일하게 배열로 만들어서 dispatch
      const _newState = Object.values(newState);
      dispatch(noteKanbanActions.setKanbanStep(_newState));

      // 스텝 이동 위치 및 순서 변경 서버로 요청 보내기
      // 
      let fromNextNoteId = _sourceNoteList[source.index - 1]?.noteId;
      let fromPreNoteId = _sourceNoteList[source.index]?.noteId;
      let toNextNoteId = _destinationNoteList[destination.index - 1]?.noteId;
      let toPreNoteId = _destinationNoteList[destination.index + 1]?.noteId;

      // 해당 noteId 없을 경우 0으로 만들어주기
      if (fromNextNoteId === undefined) { fromNextNoteId = 0; }
      if (fromPreNoteId === undefined) { fromPreNoteId = 0; }
      if (toNextNoteId === undefined) { toNextNoteId = 0; }
      if (toPreNoteId === undefined) { toPreNoteId = 0; }

      // 움직인 노트가 제자리 이동일 때는 return
      if (draggableId === String(fromNextNoteId)) return;

      // 요청 바디 꾸리기
      const position = {
        fromNextNoteId: fromNextNoteId,
        fromPreNoteId: fromPreNoteId,
        toNextNodeId: toNextNoteId, // field명 오타로 보임, toNextNoteId로 보낼 경우 error
        toPreNoteId: toPreNoteId,
        step: destinationStep.step,
      };

      // 바뀐 노트 정보 서버 요청
      dispatch(__editKanbanStep(draggableId, position));
    }
  };

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result, projects)}>
      {projects.map((project, index) => {
        // projects steps는 추가되지 않으므로 key로 index를 지정하였음
        // 추후 변동가능성이 있다면 index 대신 다른 unique id 를 key로 지정하여야 함
        return (
          <div key={index} style={{ width: "25%", minWidth: "320px" }}>
            <Droppable droppableId={String(index)}>
              {(provided, snapshot) => {
                return (
                  <div className="kanban-column">

                    {/* ---------------------------------------------------------------- */}
                    {/* Toast ---------------------------------------------------------- */}
                    {/* case. ToastStatus === true && 토스트 알림 ------------------------- */}
                    {/* ---------------------------------------------------------------- */}
                    {ToastStatus ? (
                      <div style={{ height: "100%", width: "100%" }}>
                        <Toast show={"show"}>
                          <AlertTriangle style={{ marginRight: "7px" }} />
                          <p> 다른 사람이 수정 중입니다. 새로고침 해주세요.</p>
                        </Toast>
                      </div>
                      ) : ("")
                    }

                    <div className="kanban-col-header">
                      <div className="kanban-col-title">
                        <IconSteps type={project.step} />
                        <span>{project.step}</span>
                        <Badge className="kanban-col-badge" type={project.step}>
                          {project.notes?.length}
                        </Badge>
                      </div>
                    </div>

                    <div className="kanban-col-content" ref={provided.innerRef} isdraggingover={snapshot.isdraggingover} {...provided.droppableProps}>
                      <KanbanList notes={project.notes} step={project.step} history={history} projectId={projectId} />
                      {provided.placeholder}
                    </div>

                    <ColFooter className="kanban-col-footer" type={project.step}>
                      {project.step === "STORAGE" && <ModalWriting history={history} projectId={projectId} projectStep={project.step} />}
                      {project.step === "TODO" && <ModalWriting history={history} projectId={projectId} projectStep={project.step} />}
                      {project.step === "PROCESSING" && <ModalWriting history={history} projectId={projectId} projectStep={project.step} />}
                      {project.step === "DONE" && <ModalWriting history={history} projectId={projectId} projectStep={project.step} />}
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

export default KanbanBoard;

/* == Styled-component */
const fadeIn = keyframes`
from {
  opacity:0; }
to{
    opacity:1;
}
`;
const fadeOut = keyframes`
from {
  opacity:1; }
to{
    opacity:0;
}
`;

const Toast = styled.div`
  padding: 0 24px;
  position: absolute;

  border-radius: 20px;
  min-width: 250px;
  height: 70px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  background: #387e4b;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  word-break: keep-all;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  animation: ${(props) =>
    props.show
      ? css`
          ${fadeIn} 0.5s, ${fadeOut} 0.5s 1.0s
        `
      : ""};

  -webkit-animation: ${(props) =>
    props.show
      ? css`
          ${fadeIn} 0.5s, ${fadeOut} 0.5s 1.0s
        `
      : ""};
  animation-fill-mode: forwards;
  @media (max-width: 720px) {
    svg {
      width: 40px;
      height: 40px;
    }
    p {
      font-weight: 500;
      margin-left: 10px;
      font-size: 14px;
    }
  }
`;

const Badge = styled.div`
  ${(props) =>
    props.type === "STORAGE" &&
    css`
      background-color: #ffcd40;
    `}
  ${(props) =>
    props.type === "TODO" &&
    css`
      background-color: #adbe4f;
    `}
${(props) =>
    props.type === "PROCESSING" &&
    css`
      background-color: #9bd09c;
    `}
${(props) =>
    props.type === "DONE" &&
    css`
      background-color: #f5daae;
    `}
`;

const ColFooter = styled.div`
  ${(props) =>
    props.type === "STORAGE" &&
    css`
      background-color: rgba(255, 205, 64, 0.3);
      transition: all 0.2s ease-in-out;
      &:hover {
        background-color: rgba(255, 205, 64, 0.5);
      }
    `}
  ${(props) =>
    props.type === "TODO" &&
    css`
      background-color: rgba(173, 190, 79, 0.3);
      transition: all 0.2s ease-in-out;
      &:hover {
        background-color: rgba(173, 190, 79, 0.5);
      }
    `}
${(props) =>
    props.type === "PROCESSING" &&
    css`
      background-color: rgba(155, 208, 156, 0.3);
      transition: all 0.2s ease-in-out;
      &:hover {
        background-color: rgba(155, 208, 156, 0.5);
      }
    `}
${(props) =>
    props.type === "DONE" &&
    css`
      background-color: rgba(245, 218, 174, 0.3);
      transition: all 0.2s ease-in-out;
      &:hover {
        background-color: rgba(245, 218, 174, 0.5);
      }
    `}

  & svg {
    ${(props) =>
      props.type === "STORAGE" &&
      css`
        fill: #ffbd04;
      `}
    ${(props) =>
      props.type === "TODO" &&
      css`
        fill: #adbe4f;
      `}
    ${(props) =>
      props.type === "PROCESSING" &&
      css`
        fill: #9bd09c;
      `}
    ${(props) =>
      props.type === "DONE" &&
      css`
        fill: #f5daae;
      `}
  }
`;
