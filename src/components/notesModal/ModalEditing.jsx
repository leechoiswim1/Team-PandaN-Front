import React, { useEffect, useState, useRef } from "react";

/* == Library - Style / Bootstrap / Icon */
import styled from "styled-components";
import { Button, Form }               from "react-bootstrap";
import { Edit2 }                      from "react-feather";

/* == Library - route */
import { useLocation, useParams }     from "react-router-dom";

/* == Custom - Component & Element & Icon */
import { ModalWrapper, FileUploader } from "..";
import { ReactComponent as Write }    from "../../styles/images/ico-kanban-write.svg";
import { ReactComponent as Add }      from "../../styles/images/ico-kanban-write.svg";
import { ReactComponent as Close }    from "../../styles/images/ico-close.svg";
import { ReactComponent as Title }    from "../../styles/images/icon_title.svg";
import { ReactComponent as Calendar } from "../../styles/images/icon_calender.svg";
import { ReactComponent as Note }     from "../../styles/images/icon_note.svg";
import { ReactComponent as Link }     from "../../styles/images/ico-link.svg";

/* == Redux - actions */
import { useSelector, useDispatch }   from 'react-redux';
import { noteKanbanActions }          from '../../modules/noteKanban';
// import { fileActions }                from '../../modules/file';

// * == ( Note - modal - for editing note ) -------------------- * //
const ModalEditing = ({ history, note, ...rest}) => {
  // hooks - custom
  const dispatch = useDispatch();
  const location = useLocation();
  const { projectId, noteId } =  useParams();
  // hooks - custom
  function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  // subscribe 
  // case : modalType === "editing"  
  const { detail, files } = useSelector((state) => state.noteKanban?.detail);
  const { title, content, deadline } = detail ? detail : "";
  const fileList = useSelector((state) => state.noteKanban?.filePreview);
  const isLocked = useSelector((state) => state?.noteKanban?.isLocked);
  const sameUser = useSelector((state) => state?.noteKanban?.sameUser);
  const writer = useSelector((state) => state?.noteKanban?.writer);
  // console.log("모달 창 렌더 전: isLocked : ", isLocked);
  // console.log("모달 창 렌더 전: sameUser : ", sameUser);
  // console.log("모달 창 렌더 전: writer : ", writer);

  // state
  const [modalVisible, setModalVisible] = useState(false)
  const [noteModifiedInputs, setNoteModifiedInputs] = useState({
    title: note?.title,
    content: note?.content,
    deadline: note?.deadline,
    files: fileList,
  });   

  // 주기적으로 보내는 요청: 3s
  // useInterval(() => {
  //   dispatch(noteKanbanActions.__sendWritingSignal(noteId));
  // }, 3000);

  // useEffect(() => {
  //   const sendSignal = setTimeout(() => {
  //     dispatch(noteKanbanActions.__sendWritingSignal(noteId));
  //   }, 5000);

  //   return () => {
  //     clearTimeout(sendSignal);
  //   };
  //   // dispatch(noteKanbanActions.__sendWritingSignal(noteId));
  // }); 

  // functions 
  // 모달 공통 : 클릭 시 모달창 열림
  const handleOpenModal = (e) => {
    e.preventDefault();
    e.stopPropagation();


    // promise
    // 1. 수정 모달 창 잠겼는가 체크, 
    //    응답 : 잠겼는지 여부(boolean), 작성자가 누구인지, 응답이 오면 다음 실행
    // 2-1. case 1. 열려있을 때 : 모달창을 열면서, 서버로 모달창 잠가 달라는 요청 보냄, 동시에 리덕스 상에서도 잠금
    //      그 후 파일 미리보기 준비 
    // 2-2. case 2. 닫혀있을 때 : writer 누구인지, 모달창 진입자와 현재 사용자가 동일인인지 체크(모달창을 닫고 다시 여는 경우 고려)

    // async function CheckEditMode() {
    //   try {
    //     const result1 =  await dispatch(noteKanbanActions.__checkEditmodeLocked(noteId));

    //     if (isLocked) {
    //       console.log(`isLocked가 true일때 출력됨, 모달 잠김 isLocked: ${isLocked}`);
    //       // case 2-1 : 동일한 사용자가 창을 껐다가 다시 진입 시도할 때
    //       if ( sameUser ) {
    //         console.log(`동일 작성자일 때, sameUser true: ${isLocked}, isLocked true?: ${isLocked}`);
    //         window.alert("잠시 뒤에 시도해 주세요.");
    //         return;
    //       }
    //       // case 2-2 : 다른 사용자가 작성 중일 때
    //       else { 
    //         console.log(`다른 작성자일 때, writer: ${writer}, isLocked true?: ${isLocked}`);
    //         window.alert(`${writer}님이 글을 수정 중입니다. 잠시 뒤에 시도해 주세요.`);
    //         return;
    //       }
    //     } else {
    //       console.log(`isLocked가 falsy일때 출력됨, 모달 안 잠김 isLocked: ${isLocked}`);
    //       dispatch(noteKanbanActions.__sendLockSignal(noteId));
    //       console.log(`모달 컴포넌트 true?: ${isLocked} 잠금 시그널 보냄`);
    //       dispatch(noteKanbanActions.setListPreview(files));
    //       setModalVisible(true);
    //       // dispatch(noteKanbanActions.toggleLocked( isLocked ));
    //       console.log("모달 창 렌더 후: isLocked : ", isLocked)
    //       console.log("모달 창 렌더 후: writer : ", writer)
    //       console.log("모달 창 렌더 후: sameUser :", sameUser)
    //       // 1. setModalVisible(true);
    //       // 2. dispatch(noteKanbanActions.setListPreview(files));
    //       // 3. const result2 = await dispatch(noteKanbanActions.__sendLockSignal(noteId));
    //     } 
    //   } catch {
    //     console.log("error");
    //   } 
    // };
    
    // CheckEditMode();
    dispatch(noteKanbanActions.setListPreview(files));
    setModalVisible(true);
  };

  // 모달 공통 : 클릭 시 모달창 닫힘
  const handleCloseModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.removeItem("noteDetail");

    // dispatch(noteKanbanActions.toggleLocked( false ));
    setModalVisible(false);
    
    // // case 1: 노트 수정의 경우 한 번 더 확인
    // if (modalType ==="editing") {
    //   const result = window.confirm("정말로 창을 닫으시겠습니까? 변경된 정보가 저장되지 않습니다.");
    // 	if (result) {
    //     setModalVisible(false);
    //   } else return;
    // } 
    // // case 2: 노트 생성의 경우
    // else setModalVisible(false);    
  }

  // 노트 수정 시 : 제출 시 노트 수정 요청
  const handleEditNote = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (noteModifiedInputs.title === "")    {window.alert("할 일을 입력하세요."); return;};
    if (noteModifiedInputs.content === "")  {window.alert("할 일에 대한 설명을 추가하세요."); return;};
    if (noteModifiedInputs.deadline === "") {window.alert("마감일을 입력하세요."); return;}

    // 파일 최대 첨부 개수 초과 시
		if (fileList.length > 5 ) {
			alert("최대 5개의 파일까지 업로드 할 수 있습니다.");
			return;
    }
    
    // console.log(noteModifiedInputs)
    dispatch(noteKanbanActions.__editNote(noteId, noteModifiedInputs));
    handleCloseModal(e);
  };

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* 상세 페이지에서 보이는 노트 수정 위한 ' 연필 ' 버튼 ---------------------- */}
      {/* ---------------------------------------------------------------- */}
      <button type="button" className="note-detail-button" onClick={handleOpenModal}>
        <Edit2 />
      </button>
      {/* ---------------------------------------------------------------- */}
      {/* Modal ---------------------------------------------------------- */}
      {/* case. modalVisible === true && 모달창 렌더 ----------------------- */}
      {/* ---------------------------------------------------------------- */}
      { modalVisible && 
        <ModalWrapper
          visible={true} 
          maskClosable={false}          
          onClose={handleCloseModal} 
        >
        <div tabIndex="0" className="note-modal-wrapper">
          <div className="note-modal-container">
            <div className="note-modal-header">
              <div>
                <Add width="24" height="24" fill="#191919"/>
                <h1>할 일 수정하기</h1>
              </div>
              <Close width="24" height="24" fill="#191919" className="note-modal-closer" onClick={handleCloseModal}/>
            </div>

            <Form>
              <div className="note-modal-table">
                <div className="note-modal-tr">
                  <div className="note-modal-th">
                    <Title />
                    <Form.Label>
                      제목 작성
                    </Form.Label>                  
                  </div>
                  <div className="note-modal-td">
                      <Form.Control
                        className="note-modal-form-width"
                        type="text" 
                        placeholder="제목을 입력해 주세요. 최대 255자까지 입력 가능합니다." 
                        maxLength={255}
                        defaultValue={note?.title}
                        onChange={(e)=> {setNoteModifiedInputs({...noteModifiedInputs, title: e.target.value})}}
                      />
                  </div>
                </div>
                <div className="note-modal-tr">
                  <div className="note-modal-th">
                    <Calendar />
                    <Form.Label>
                      마감일 선택
                    </Form.Label>
                  </div>
                  <div className="note-modal-td">
                  <Form.Control 
                    className="note-modal-form-width"
                    type="date" 
                    placeholder=""
                    defaultValue={note?.deadline}
                    onChange={(e)=> {setNoteModifiedInputs({...noteModifiedInputs, deadline: e.target.value})}}
                  />  
                  </div>
                </div>
                <div className="note-modal-tr cell-file-upload">
                  <div className="note-modal-th cell-align-top">
                    <Link width="24" height="24" fill="#767676"/>
                    <Form.Label>
                      첨부파일
                    </Form.Label>
                  </div>
                  <div className="note-modal-td cell-align-top">
                    <FileUploader files={files}/>
                  </div>
                </div>
                <div className="note-modal-tr cell-align-top">
                  <div className="note-modal-th cell-align-top">
                    <Note />
                    <Form.Label>
                      할 일 설명
                    </Form.Label>
                  </div>
                  <div className="note-modal-td">
                    <Form.Control 
                      placeholder="할 일에 대한 설명을 추가해 주세요."
                      as="textarea"
                      defaultValue={note?.content}
                      style={{ height: "10rem" }}
                      onChange={(e)=> {setNoteModifiedInputs({...noteModifiedInputs, content: e.target.value})}}
                    />
                  </div>
                </div>
              </div>
            </Form>
          </div>
            <div className="note-modal-footer-button" onClick={handleEditNote}>
            <h1>수정하기</h1>
            </div>
        </div>
        </ModalWrapper>
      }
    </>
  )
}

export default ModalEditing;