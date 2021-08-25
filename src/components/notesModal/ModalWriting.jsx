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

// * == ( Note - modal - for writing note ) -------------------- * //
const ModalWriting = ({ history, projectStep, modalType, ...rest}) => {
  // hooks
  const dispatch = useDispatch();
  const location = useLocation();
  const { projectId, noteId } =  useParams();
 
  // subscribe 
  const fileList = useSelector((state) => state.noteKanban?.filePreview);

  // state
  const [modalVisible, setModalVisible] = useState(false)
  const [noteInputs, setNoteInputs] = useState({
    title: "",
    content: "",
    deadline: "",
    step: projectStep,
    files: [],
  });

  // functions 
  // 모달 공통 : 클릭 시 모달창 열림
  const handleOpenModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // 파일 미리보기 reset
    dispatch(noteKanbanActions.resetPreview());
    setModalVisible(true);
  } 

  // 모달 공통 : 클릭 시 모달창 닫힘
  const handleCloseModal = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setModalVisible(false);
  }

  // functions - 생성 / 수정
  // 노트 생성 시 : 제출 시 노트 생성 요청
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
    
    // 상태 변경 : 입력값 서버에 전송
    dispatch(noteKanbanActions.__addNote(projectId, noteInputs));
  
    handleCloseModal(e);

    // 게시판 형 페이지에서 작성 시 게시판 형 페이지 리덕스에서 노트 추가 필요

    // if (!noteId) {
    //   history.push(location.pathname);
    // }
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
        <div class="dropdown">
          <button class="dropbtn-writing-modal" onClick={handleOpenModal} >
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
                <Add width="24" height="24" fill="#191919"/>
                <h1>할 일 만들기</h1>
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
                        onChange={(e)=> {setNoteInputs({...noteInputs, title: e.target.value})}}
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
                    onChange={(e)=> {setNoteInputs({...noteInputs, deadline: e.target.value})}}
                  />  
                  </div>
                </div>
                <div className="note-modal-tr">
                  <div className="note-modal-th">
                    <Calendar />
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
                    <Note />
                    <Form.Label>
                      할 일 설명
                    </Form.Label>
                  </div>
                  <div className="note-modal-td">
                    <Form.Control 
                      placeholder="할 일에 대한 설명을 추가해 주세요."
                      as="textarea"
                      style={{ height: "10rem" }}
                      onChange={(e)=> {setNoteInputs({...noteInputs, content: e.target.value})
                    }}
                    />
                  </div>
                </div>
              </div>
            </Form>
          </div>
            <div className="note-modal-footer-button" onClick={handleAddNote}>
            <h1>만들기</h1>
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

const StyledBtn = styled(Button)`
  width: 120px;
  height: 38px;
  background-color: #387E4B;
  color: #FFFFFF;
  border: 1px solid #EDEDED;
  font-weight: 500;
  font-size: 15.5px;
  border-radius: 10px;
  & svg { margin: -2px 8px 0 0; }
`
export default ModalWriting;