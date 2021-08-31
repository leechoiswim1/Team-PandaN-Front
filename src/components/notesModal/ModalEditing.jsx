import React, { useEffect, useState, useRef } from "react";

/* == Library - Style / Bootstrap / Icon */
import styled, { css, keyframes }     from "styled-components";
import { Form }                       from "react-bootstrap";
import { Edit2, AlertTriangle }       from "react-feather";

/* == Library - route */
import { useLocation, useParams }     from "react-router-dom";

/* == Custom - Component & Element & Icon */
import { ModalWrapper, FileUploader } from "..";
import { ReactComponent as Add }      from "../../styles/images/ico-kanban-write.svg";
import { ReactComponent as Close }    from "../../styles/images/ico-close.svg";
import { ReactComponent as Title }    from "../../styles/images/ico-title.svg";
import { ReactComponent as Calendar } from "../../styles/images/ico-calender.svg";
import { ReactComponent as Note }     from "../../styles/images/ico-note.svg";
import { ReactComponent as Link }     from "../../styles/images/ico-link.svg";

/* == Axios - instance 및 api 요청 함수 */
import { noteApi }                    from "../../shared/api";
/* == Redux - actions */
import { useSelector, useDispatch }   from 'react-redux';
import { noteKanbanActions }          from '../../modules/noteKanban';

// * == ( Note - modal - for editing note ) -------------------- * //
const ModalEditing = ({ history, note, ...rest}) => {
  // -----------------------------------------------------------
  // * == hooks / custom hooks
  // ----------------------------------------------------------- 
  const dispatch = useDispatch();
  const { projectId, noteId } =  useParams();
  function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // 파라메터로 들어오는 콜백 
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // 인터벌 간격 설정
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  // -----------------------------------------------------------
  const [sameUser, setSameUser] = useState(false);
  const [anotherUser, setAnotherUser] = useState(false);
  const [writer, setWriter] = useState("");
  // -----------------------------------------------------------
    // toast 1.
    useEffect(() => {
      if (sameUser) {
        setTimeout(() => {
          setSameUser(false);
        }, 1500);
      }
    }, [sameUser]);

     // toast 2.
     useEffect(() => {
      if (anotherUser) {
        setTimeout(() => {
          setAnotherUser(false);
        }, 1500);
      }
    }, [anotherUser]);
  // -----------------------------------------------------------


  // -----------------------------------------------------------
  // * == subscribe state
  // ----------------------------------------------------------- 
  const { files } = useSelector((state) => state.noteKanban?.detail);
  const fileList  = useSelector((state) => state.noteKanban?.filePreview);
  // -----------------------------------------------------------
  // * == set state
  // ----------------------------------------------------------- 
  const [modalVisible, setModalVisible] = useState(false);
  const [noteModifiedInputs, setNoteModifiedInputs] = useState({
    title: note?.title,
    content: note?.content,
    deadline: note?.deadline,
    files: fileList,
  });
  
  // -----------------------------------------------------------
  // * == functions : request to REST API
  // -----------------------------------------------------------   
  /**
   * __sendLockSignal
   * @param {number} noteId ; 해당 노트의 noteId
   *  - 수정 모달 진입하며 최초에 한 번 호출, 해당 노트 lock manger 잠금 요청
   *  - 수정 모달 종료 후 서버에서 lock manger 풀림 응답 받음
   */
  const __sendLockSignal = (noteId) =>
    async (dispatch, getState, { history }) => {
      try {
        const response = await noteApi.sendLockSignal(noteId);
        // 해당 응답은 모달 창 종료 후 lock manager 풀렸을 때 받게 됨
      } catch (e) {
        console.log(e);
      }
    };
    
  /**
   * __sendWritingSignal
   * @param {number} noteId ; 해당 노트의 noteId
   *  - 수정 모달 진입 후 __sendLockSignal 요청 보낸 뒤 호출 되며, 주기적으로 요청을 보냄
   *  - 잠금 유지를 위해 사용자가 해당 노트를 수정 중임을 약속된 간격으로 서버에 알려줌
   *  - 요청이 들어가지 않을 경우(모달 창을 종료했을 경우) 해당 노트 잠금 해제
   */
  const __sendWritingSignal = (noteId) =>
    async (dispatch, getState, { history }) => {
      try {
        const { data } = await noteApi.sendWritingSignal(noteId);  
      } catch (e) {
        console.log(e);
      }
    };

  // * == 모달 창이 열려있을 때 해당 간격으로 __sendWritingSignal 호출
  let flag = 0;
  useInterval(() => {
    dispatch(__sendWritingSignal(noteId));
    flag++;
    let now = new Date();
    console.log(flag, "신호 보냄", now);
  }, ( modalVisible ) ? 3000 : null);

  /**
   * __checkEditmodeLocked
   * @param {number} noteId ; 해당 노트의 noteId
   *  - 수정 버튼을 클릭하였을 때 호출
   *  - case 1 : 수정 모달 사용할 수 있을 때 모달창 진입 및 진입 후 과정
   *  - 요청이 들어가지 않을 경우(모달 창을 종료했을 경우) 해당 노트 잠금 해제
   */
  const __checkEditmodeLocked = (noteId) => 
    async (dispatch, getState, { history }) => {
      try {
        // 1. 해당 노트가 잠겼는지 확인 요청
        const { data } = await noteApi.checkEditmodeLocked(noteId);
        // 1-1. 1에 대한 응답을 받은 후 실행
        const { locked, writer, sameUser } = data;
        // 2. 수정 모달 진입
        // case 1. 안 잠겼을 경우: 모달 창을 띄운 다음, lock manager 실행 요청 및 해당 노트의 기존 파일 미리보기 셋업
        if ( !locked ) {
          setModalVisible(true);
          dispatch(__sendLockSignal(noteId));
          dispatch(noteKanbanActions.setListPreview(files));
        } 
        // case 2. 잠겼을 경우
        else {
          // //case 2-1 : 동일한 사용자가 창을 껐다가 다시 진입 시도할 때
          // if ( sameUser ) { window.alert("잠시 뒤에 시도해 주세요."); return; }
          // // case 2-2 : 다른 사용자가 작성 중일 때
          // else { window.alert(`${writer}님이 글을 수정 중입니다. 잠시 뒤에 시도해 주세요.`); return; }
  // -----------------------------------------------------------
          // case 2-1 : 동일한 사용자가 창을 껐다가 다시 진입 시도할 때
          if ( sameUser ) { setSameUser(true); return; }
          // case 2-2 : 다른 사용자가 작성 중일 때
          else { setAnotherUser(true); setWriter(writer); return; }
  // -----------------------------------------------------------
        }
      } catch (e) {
        console.log(e);
      };  
    }  

  // -----------------------------------------------------------
  // * == functions : handler
  // -----------------------------------------------------------   
  // 모달 공통 : 클릭 시 모달창 열림
  // ----------------------------------------------------------- 
  const handleOpenModal = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    };    
    e.preventDefault();
    e.stopPropagation();
    setNoteModifiedInputs({
      title: note?.title,
      content: note?.content,
      deadline: note?.deadline,
      files: fileList,
    });
    dispatch(__checkEditmodeLocked(noteId));
  };

  // -----------------------------------------------------------   
  // 모달 공통 : 클릭 시 모달창 닫힘
  // ----------------------------------------------------------- 
  const handleCloseModal = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const result = window.confirm("정말로 창을 닫으시겠습니까? 수정한 내용이 저장되지 않습니다.");
    if (result) {
      setModalVisible(false);
    } else return;
  }

  // -----------------------------------------------------------   
  // 노트 수정 제출 : 클릭 시 내용 수정 요청
  // ----------------------------------------------------------- 
  const handleEditNote = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (noteModifiedInputs.title === "")    {window.alert("제목을 입력하세요."); return;};
    if (noteModifiedInputs.content === "")  {window.alert("할 일에 대한 설명을 추가하세요."); return;};
    if (noteModifiedInputs.deadline === "") {window.alert("마감일을 입력하세요."); return;};

    // 파일 최대 첨부 개수 초과 시
		if (fileList.length > 5 ) { window.alert("최대 5개의 파일까지 업로드 할 수 있습니다."); return; };
    // 해당 noteId, 수정된 내용 서버로 요청 보낸 후 모달창 종료
    dispatch(noteKanbanActions.__editNote(noteId, noteModifiedInputs));
    setNoteModifiedInputs({
      title: "",
      content: "",
      deadline: "",
      files: "",
    });
    setModalVisible(false);
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
              <div className="note-modal-table">
                <div className="note-modal-tr">
                  <div className="note-modal-th">
                    <Title width="24" height="24" fill="#767676"/>
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
                    <Calendar width="24" height="24" fill="#767676"/>
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
                    <Note width="24" height="24" fill="#767676"/>
                    <Form.Label>
                      할 일 설명
                    </Form.Label>
                  </div>
                  <div className="note-modal-td">
                    <Form.Control 
                      placeholder="할 일에 대한 설명을 추가해 주세요."
                      as="textarea"
                      className="note-modal-textarea"
                      defaultValue={note?.content}
                      style={{ height: "10rem" }}
                      onChange={(e)=> {setNoteModifiedInputs({...noteModifiedInputs, content: e.target.value})}}
                    />
                  </div>
                </div>
              </div>
          </div>
            <div className="note-modal-footer-button" onClick={handleEditNote}>
            <h1>할 일 수정하기</h1>
            </div>
        </div>
        </ModalWrapper>
      }
      {/* ---------------------------------------------------------------- */}
      {/* toast 1 -------------------------------------------------------- */}
      {/* ---------------------------------------------------------------- */}
      { sameUser ? (  
          <Toast show={"show"}>
            <AlertTriangle style={{ marginRight: "7px" }} />
            창이 잠겼습니다. 잠시 뒤에 시도해 주세요.
          </Toast>        
      ) : (
        ""
      )}
      {/* ---------------------------------------------------------------- */}
      {/* toast 2 -------------------------------------------------------- */}
      {/* ---------------------------------------------------------------- */}
      { anotherUser ? (        
          <Toast show={"show"}>
            <AlertTriangle style={{ marginRight: "7px" }} />
            {writer}님이 글을 수정 중입니다. 잠시 뒤에 시도해 주세요.
          </Toast>        
      ) : (
        ""
      )}
    </>
  )
}

export default ModalEditing;

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
  top: 50%;
  left: 50%;
  border-radius: 20px;
  min-width: 250px;
  height: 70px;
  transform: translate(-50%, -50%);
  z-index: 3;
  background: #387e4b;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  // animation-duration: 0.3s;
  // animation-timing-function: ease-out;
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
`;
