import { createAction, handleActions } from "redux-actions";
import { noteApi } from "../shared/api";
import { produce } from 'immer';

/* == Notes - initial state */
const initialState = {
  kanban: [
    {
      step: "STORAGE",
      notes: [
        {
          noteId: 1,
          title: "",
          content: "",
          deadline: "",
        },
      ],
    },
    {
      step: "TODO",
      notes: [],
    },
    {
      step: "PROCESSING",
      notes: [],
    },
    {
      step: "DONE",
      notes: [],
    },
  ],
  detail: {
    content: "",
    deadline: "",
    noteId: 0,
    step: "",
    title: "",
    isBookmark: false,
    files: [],
  },
  filePreview: [],
  is_loading: false,
  is_locked: false,
  writer: "",
  sameUser: false,
};

/* == action */
/* project - kanban */
const GET_KANBAN_NOTES  = "note_kanban/GET_KANBAN_NOTES";
const SET_KANBAN_STEP   = "note_kanban/SET_KANBAN_STEP";
const EDIT_KANBAN_STEP  = "note_kanban/GET_KANBAN_NOTES";
/* note - CRUD / detail */
const ADD_NOTE          = "note_kanban/ADD_NOTE";
const GET_NOTE_DETAIL   = "note_detail/GET_NOTE_DETAIL";
const EDIT_NOTE         = "note_detail/EDIT_NOTE";
const DELETE_NOTE       = "note_detail/DELETE_NOTE";
const SET_MODIFIED_NOTE = "note_detail/SET_MODIFIED_NOTE";
/* note - edit mode ; lock manager */
const CHECK_EDITMODE_LOCKED = "note_detail/CHECK_EDITMODE_LOCKED";
/* bookmark - add / delete */
const ADD_BOOKMARK      = "note_bookmark/ADD_BOOKMARK";
const DELETE_BOOKMARK   = "note_bookmark/DELETE_BOOKMARK";
/* file preview - add / delete */
const SET_PREVIEW       = "note_file/SET_PREVIEW";
const RESET_PREVIEW     = "note_file/RESET_PREVIEW";
const DELETE_PREVIEW    = "note_file/DELETE_PREVIEW";
const SET_LIST_PREVIEW  = "note_file/SET_LIST_PREVIEW";
/* loading - for spinner */
const LOADING           = "note_kanban/LOADING";

/* == action creator */
/* project - kanban */
const getKanbanNotes = createAction(GET_KANBAN_NOTES, (kanbanNotes) => ({ kanbanNotes }));
const setKanbanStep = createAction(SET_KANBAN_STEP, (newState) => ({ newState }));
const editKanbanStep = createAction(EDIT_KANBAN_STEP, (noteId) => ({ noteId }));
/* note - CRUD / detail */
const addNote = createAction(ADD_NOTE, (newNote) => ({ newNote }));
const getNoteDetail = createAction(GET_NOTE_DETAIL, (note) => ({ note }));
const editNote = createAction(EDIT_NOTE, (noteId) => ({ noteId }));
const deleteNote = createAction(DELETE_NOTE, (noteId) => ({ noteId }));
const setModifiedNote = createAction(SET_MODIFIED_NOTE, (modifiedNote) => ({ modifiedNote }));
/* note edit mode ; lock manager */
const checkEditmodeLocked = createAction(CHECK_EDITMODE_LOCKED, ( is_locked, writer, sameUser ) => ({ is_locked, writer, sameUser }));
/* bookmark - add / delete */
const addBookmark = createAction(ADD_BOOKMARK, (noteId) => ({ noteId }));
const deleteBookmark = createAction(DELETE_BOOKMARK, (noteId) => ({ noteId }));
/* file preview - add / delete */
const setPreview    = createAction(SET_PREVIEW, ( fileName, awsFileName, fileUrl ) => ({ fileName, awsFileName, fileUrl }));
const resetPreview  = createAction(RESET_PREVIEW, () => ({}));
const deletePreview = createAction(DELETE_PREVIEW, ( fileUrl ) => ({ fileUrl }));
const setListPreview = createAction(SET_LIST_PREVIEW, ( fileList ) => ({ fileList }));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

/* == thunk function */
/* kanban */
const __getKanbanNotes =
  (projectId) =>
  async (dispatch, getState, { history }) => {
    dispatch(loading(true));
    try {
      const { data } = await noteApi.getKanbanNotes(projectId);
      dispatch(getKanbanNotes(data.projects));
    } catch (e) {
      console.log(e);
    }
  };

const __editKanbanStep =
  (noteId, position) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await noteApi.editKanbanStep(noteId, position);
      // dispatch(editKanbanStep(data.projects));
    } catch (e) {
      console.log(e);
      window.alert("새로고침이 필요합니다.");
    }
  };


/* note - detail */
const __getNoteDetail =
  (noteId) =>
  async (dispatch, getState, { history }) => {
    dispatch(loading(true));
    try {
      const { data } = await noteApi.getNoteDetail(noteId);
      dispatch(getNoteDetail(data));
    } catch (e) {
      console.log(e);
    }
  };
  
/* note - edit mode ; lock manager */

// 수정모드에서 모달창 버튼 눌러 진입 시도 시 호출
// 수정모드에 진입할 수 있는지 여부 업데이트 해 주기 전 처리
const __checkEditmodeLocked =
  (noteId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await noteApi.checkEditmodeLocked(noteId);
      const { locked, writer, sameUser } = data;

      // edit mode 잠그기
      // case 1 : 안 잠겼을 경우, locked: true로 만들고 수정 모달 잠가 줄 것
      if ( !locked ) {
        dispatch(checkEditmodeLocked( true, writer, sameUser ));
      }  
    
      // case 2 : 잠겼을 경우
      if ( locked ) {
        dispatch(checkEditmodeLocked( locked, writer, sameUser ));
        // case 2-1 : 동일한 사용자가 창을 껐다가 다시 진입 시도할 때
        if ( sameUser ) window.alert("잠시 뒤에 시도해 주세요.");
        // case 2-2 : 다른 사용자가 작성 중일 때
        else window.alert(`${writer}님이 글을 수정 중입니다. 잠시 뒤에 시도해 주세요.`);
          return;
      }
    } catch (e) {
      console.log(e);
    }
  };

// 수정 모달 진입 시점에 한 번 호출
// 수정 모달 잠금 요청
const __sendLockSignal =
(noteId) =>
async (dispatch, getState, { history }) => {
  try {
    // 수정 모달 잠가 줄 것
    dispatch(checkEditmodeLocked( true ));
    const response = await noteApi.sendLockSignal(noteId);
    // 잠금이 풀릴 때 서버로부터 응답이 옴, 그 후 수정 모달을 접근가능 하도록 풀어 줄 것
    const __changeEditmode = await dispatch(checkEditmodeLocked( false ));    
  } catch (e) {
    console.log(e);
  }
};

// 수정 모달 진입 시점에 호출 되며, 주기적으로 요청을 보냄
// 수정 모달 사용 중임을 주기적으로(약속된 간격으로) 서버에 알려줌
const __sendWritingSignal =
  (noteId) =>
  async (dispatch, getState, { history }) => {    
    try {
      const { data } = await noteApi.sendWritingSignal(noteId);  
      // 수정 모달 잠금 유지
      dispatch(checkEditmodeLocked( true ));    
    } catch (e) {
      console.log(e);
    }
  };

/* note - CRUD */
const __addNote =
  (projectId, newNote) =>
  async (dispatch, getState, { history }) => {
    const files = getState().noteKanban.filePreview ? getState().noteKanban.filePreview : [];
    // awsFileName 제거
    files.map(file => delete file.awsFileName); 
    const _newNote = { ...newNote, files: files }
    try {
      const { data } = await noteApi.addNote(projectId, _newNote);
      dispatch(addNote(data));
    } catch (e) {
      console.log(e);
    }
  };

const __editNote =
  (noteId, modifiedNote) =>
  async (dispatch, getState, { history }) => {
    const files = 
      getState().noteKanban.filePreview ? getState().noteKanban.filePreview : [];
    // awsFileName 제거
    files.map(file => delete file.awsFileName); 
    // fileId가 있는 것과 없는 것 분리
    const oldFiles = files.filter(file => "fileId" in file);
    const newFiles = files.filter(file => !("fileId" in file));
    // 없는 파일은 fileId : 0 ; 추가
    newFiles.forEach(newFile => newFile.fileId = 0);
    const _newFileList = oldFiles.concat(newFiles)

    const _newModifiedNote = {
      // ...modifiedNote,
      // files: _newFileList
    }
    // console.log("요청 보내기 전", _newModifiedNote)
    try {
      // const { data } = await noteApi.editNote(noteId, _newModifiedNote);
      // dispatch(setModifiedNote(data));
    } catch (e) {
      console.log(e);
    }
  };

const __deleteNote =
  (noteId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await noteApi.deleteNote(noteId);
      dispatch(deleteNote(noteId));
      history.goBack();
    } catch (e) {
      console.log(e);
    }
  };

const __addBookmark =
(noteId) =>
async (dispatch, getState, { history }) => {
  try {
    const { data } = await noteApi.addBookmark(noteId);
    dispatch(addBookmark(noteId));
  } catch (e) {
    console.log(e);
  }
};

const __deleteBookmark =
(noteId) =>
async (dispatch, getState, { history }) => {
  try {
    const { data } = await noteApi.deleteBookmark(noteId);
    dispatch(deleteBookmark(noteId));
  } catch (e) {
    console.log(e);
  }
};

/* == reducer */
const noteKanban = handleActions(
  {
    [SET_KANBAN_STEP]: (state, action) => {
      return {
        ...state,
        kanban: action.payload.newState,
        is_loading: false
      };
    },
    [GET_KANBAN_NOTES]: (state, action) => {
      return {
        ...state,
        kanban: action.payload.kanbanNotes,
        is_loading: false
      };
    },
    [GET_NOTE_DETAIL]: (state, action) => {
      return {
        ...state,
        detail: action.payload.note,
        is_loading: false
      };
    },
    [ADD_NOTE]: (state, action) => {
      const note = action.payload.newNote;
      return {
        ...state,
        kanban: state.kanban.map((step) => {
          if (step.step === note.step) {
            return {
              ...step,
              notes: [note, ...step.notes],
            };
          } else {
            return step;
          }
        }),
        is_loading: false
      };
    },
    [SET_MODIFIED_NOTE]: (state, action) => {
      const note = action.payload.modifiedNote;
      return {
        ...state,
        detail: {
          ...state.detail,
          noteId: note.noteId,
          title: note.title,
          content: note.content,
          deadline: note.deadline,
          step: note.step,
        },
        is_loading: false
      };
    },
    [CHECK_EDITMODE_LOCKED]: (state, action) => {
      return {
        ...state,
        is_locked: action.payload.is_locked,
        writer: action.payload.writer,
        sameUser: action.payload.sameUser
      };
    },
    [DELETE_NOTE]: (state, action) => {
      return {
        ...state,
        kanban: state.kanban.filter((note) => note.noteId !== action.payload.noteId),
      };
    },
    [ADD_BOOKMARK]: (state, action) => {
      return {
        ...state,
        detail: { 
          ...state.detail, 
          detail: {...state.detail.detail, isBookmark: true},
        },
      }
    },
    [DELETE_BOOKMARK]: (state, action) => {
      return {
        ...state,
        detail: { 
          ...state.detail, 
          detail: {...state.detail.detail, isBookmark: false},
        },
      }
    },
    [SET_PREVIEW]: (state, action) => {
      return {
        ...state,
        filePreview: [
          ...state.filePreview, 
          {
            fileName: action.payload.fileName,
            awsFileName: action.payload.awsFileName,
            fileUrl: action.payload.fileUrl,          
          }
        ]
      };  
    },
    [RESET_PREVIEW]: (state, action) => {
      return {
        ...state,
        filePreview: [],
      };  
    },
    [DELETE_PREVIEW]: (state, action) => {
      return {
        ...state,
        filePreview: state.filePreview.filter((file) => file.fileUrl !== action.payload.fileUrl),
      };  
    },
    [SET_LIST_PREVIEW]: (state, action) => {
      return {
        ...state,
        filePreview: action.payload.fileList,
      };  
    },
    [LOADING]: (state, action) => {
      return {
        ...state,
        is_loading: action.payload.is_loading
      };  
    },
  },  
  initialState,
);

/* == export actions */
export const noteKanbanActions = {
  /* project - kanban */
  __getKanbanNotes,
  __editKanbanStep,
  setKanbanStep,
  /* note - CRUD / detail */
  __addNote,
  __getNoteDetail,
  __editNote,
  __deleteNote,
  /* note - edit mode ; lock manager */
  __checkEditmodeLocked,
  __sendLockSignal,
  __sendWritingSignal,
  /* bookmark - add / delete */
  __addBookmark,
  __deleteBookmark,
  /* file preview - add / delete */
  setPreview,
  resetPreview,
  deletePreview,
  setListPreview,
};

export default noteKanban;
