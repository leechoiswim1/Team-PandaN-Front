import React, { useEffect, useState, useRef } from "react";

/* == Library - Style / Bootstrap / Icon */
import styled from "styled-components";
import { Form }                       from "react-bootstrap";

/* == Library - route */
import { useLocation, useParams }     from "react-router-dom";

/* == Custom - Component & Element & Icon */
import { ModalWrapper, FileUploader } from "..";
import { ReactComponent as Write }    from "../../styles/images/ico-kanban-write.svg";
import { ReactComponent as Status }   from "../../styles/images/ico-step.svg";
import { ReactComponent as Close }    from "../../styles/images/ico-close.svg";
import { ReactComponent as Title }    from "../../styles/images/ico-title.svg";
import { ReactComponent as Calendar } from "../../styles/images/ico-calender.svg";
import { ReactComponent as Note }     from "../../styles/images/ico-note.svg";
import { ReactComponent as Link }     from "../../styles/images/ico-link.svg";

/* == Redux - actions */
import { useSelector, useDispatch }   from 'react-redux';
import { noteKanbanActions }          from '../../modules/noteKanban';

// * == ( Note - modal - for writing note ) -------------------- * //
const ModalWriting = ({ history, projectStep, modalType, ...rest}) => {
  // -----------------------------------------------------------
  // * == hooks
  // ----------------------------------------------------------- 
  const dispatch = useDispatch();
  const { projectId, noteId } =  useParams();
  // -----------------------------------------------------------
  // * == subscribe state
  // ----------------------------------------------------------- 
  const fileList = useSelector((state) => state.noteKanban?.filePreview);
  // -----------------------------------------------------------
  // * == subscribe state
  // ----------------------------------------------------------- 
  const [modalVisible, setModalVisible] = useState(false)
  const [noteInputs, setNoteInputs] = useState({
    title: "",
    content: "",
    deadline: "",
    step: projectStep,
    files: [],
  });

  // -----------------------------------------------------------
  // * == functions : handler
  // -----------------------------------------------------------   
  // 모달 공통 : 클릭 시 모달창 열림
  // ----------------------------------------------------------- 
  const handleOpenModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(noteKanbanActions.resetPreview()); // 파일 미리보기 reset
    setModalVisible(true);
  } 
  // -----------------------------------------------------------   
  // 모달 공통 : 클릭 시 모달창 닫힘
  // ----------------------------------------------------------- 
  const handleCloseModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = window.confirm("정말로 창을 닫으시겠습니까? 작성한 내용이 저장되지 않습니다.");
    if (result) {
      setModalVisible(false);
    } else return;
  }

  // -----------------------------------------------------------   
  // 노트 작성 제출 : 클릭 시 내용 작성 요청
  // ----------------------------------------------------------- 
  const handleAddNote = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (noteInputs.title === "")    {window.alert("할 일을 입력하세요."); return;};
    if (noteInputs.content === "")  {window.alert("할 일에 대한 설명을 추가하세요."); return;};
    if (noteInputs.step === "")     {window.alert("할 일의 상태를 설정하세요."); return;};
    if (noteInputs.deadline === "") {window.alert("마감일을 입력하세요."); return;};
    
    // 파일 최대 첨부 개수 초과 시
		if (fileList.length > 5 ) {
			alert("최대 5개의 파일까지 업로드 할 수 있습니다.");
			return;
    }
    
    // 해당 noteId, 입력 내용 서버로 요청 보낸 후 모달창 종료, 이후 해당 프로젝트의 칸반 페이지로 이동
    dispatch(noteKanbanActions.__addNote(projectId, noteInputs));
    setModalVisible(false);
    setNoteInputs({
      title: "",
      content: "",
      deadline: "",
      step: projectStep,
      files: [],
    });
    history.push(`/projects/${projectId}/kanban`); 
  };

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Button --------------------------------------------------------- */}
      {/* case1. props.projectStep --------------------------------------- */}
      {/* 칸반 창에서 보이는 노트 작성 위한 ' + ' 버튼 -------------------------- */}
      {/* ---------------------------------------------------------------- */}      
      { projectStep &&
      <KanbanColBtn onClick={handleOpenModal}>
        <Write type={projectStep} width="24" height="24" />
      </KanbanColBtn>
      }
      {/* ---------------------------------------------------------------- */}
      {/* case2. props.modalType === "projectMenu" ----------------------- */}
      {/* 프로젝트 메뉴에서 보이는 노트 작성 위한 ' 할 일 만들기 ' 버튼 ------------ */}
      {/* ---------------------------------------------------------------- */}
      { modalType === "projectMenu" && 
      <>
        <div className="dropdown">
          <button className="dropbtn-writing-modal" onClick={handleOpenModal} >
            <Write fill="#FFFFFF" width="14" height="14" style={{ marginRight: "4px", marginTop: "2px"}}/>
            할 일 만들기
          </button>
        </div>
      </>
      }
  
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
                <Write width="24" height="24" fill="#191919"/>
                <h1>할 일 만들기</h1>
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
                        onChange={(e)=> {setNoteInputs({...noteInputs, title: e.target.value})}}
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
                    onChange={(e)=> {setNoteInputs({...noteInputs, deadline: e.target.value})}}
                  />  
                  </div>
                </div>
                <div className="note-modal-tr">
                  <div className="note-modal-th">
                    <Status width="24" height="24" fill="#767676" className="note-modal-irregular-button"/>
                    <Form.Label>
                      상태 설정
                    </Form.Label>
                  </div>
                  <div className="note-modal-td">
                    <Form.Select 
                      className="note-modal-form-width"
                      placeholder=""
                      defaultValue={projectStep}
                      onChange={(e)=> {setNoteInputs({...noteInputs, step: e.target.value})}}
                    >
                      <option value="">할 일의 상태를 설정하세요.</option>
                      <option value="STORAGE">STORAGE</option>
                      <option value="TODO">TO DO</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="DONE">DONE</option>
                    </Form.Select>
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
                    <FileUploader />
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
                      onChange={(e)=> {setNoteInputs({...noteInputs, content: e.target.value})
                    }}
                    />
                  </div>
                </div>
              </div>
          </div>
            <div className="note-modal-footer-button" onClick={handleAddNote}>
            <h1>할 일 만들기</h1>
            </div>
        </div>
        </ModalWrapper>
      }
    </>
  )
}

const KanbanColBtn = styled.div`
  width: 100%; 
  height: 100%; 
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default ModalWriting;