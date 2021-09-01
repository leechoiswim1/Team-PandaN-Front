/**
 * --------------------------------------------------------------------------
 * Redux Module: noteKanban.js
  * 기능 (노트 - 칸반 / 노트 CRUD / 노트 상세 / 북마크 / 파일 업로드 미리보기 관련)
 * --------------------------------------------------------------------------
 */

/**
 * --------------------------------------------------------------------------
 * import
    * [Library] redux-actions
    * [Library] immer
    * [Custom] api: axios instance 및 api 요청 함수
 * --------------------------------------------------------------------------
 */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { noteApi } from "../shared/api";

/**
 * --------------------------------------------------------------------------
 * initial state
 * --------------------------------------------------------------------------
 */

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
  isLoading: false,
  isLocked: false,
  writer: "",
  sameUser: "",
};

/**
 * --------------------------------------------------------------------------
 * action
 * --------------------------------------------------------------------------
 */

/* project - kanban ------------------------------------------------------ */
const GET_KANBAN_NOTES  = "note_kanban/GET_KANBAN_NOTES";
const SET_KANBAN_STEP   = "note_kanban/SET_KANBAN_STEP";
const EDIT_KANBAN_STEP  = "note_kanban/GET_KANBAN_NOTES";
/* note - CRUD / detail -------------------------------------------------- */
const ADD_NOTE          = "note_kanban/ADD_NOTE";
const GET_NOTE_DETAIL   = "note_detail/GET_NOTE_DETAIL";
const EDIT_NOTE         = "note_detail/EDIT_NOTE";
const DELETE_NOTE       = "note_detail/DELETE_NOTE";
const SET_MODIFIED_NOTE = "note_detail/SET_MODIFIED_NOTE";
/* bookmark - add / delete ----------------------------------------------- */
const ADD_BOOKMARK      = "note_bookmark/ADD_BOOKMARK";
const DELETE_BOOKMARK   = "note_bookmark/DELETE_BOOKMARK";
/* file preview - add / delete ------------------------------------------- */
const SET_PREVIEW       = "note_file/SET_PREVIEW";
const RESET_PREVIEW     = "note_file/RESET_PREVIEW";
const DELETE_PREVIEW    = "note_file/DELETE_PREVIEW";
const SET_LIST_PREVIEW  = "note_file/SET_LIST_PREVIEW";
/* loading - for spinner ------------------------------------------------- */
const LOADING           = "note_kanban/LOADING";
/* ----------------------------------------------------------------------- */

/**
 * --------------------------------------------------------------------------
 * action creator
 * --------------------------------------------------------------------------
 */

/* project - kanban ------------------------------------------------------ */
const getKanbanNotes  = createAction(GET_KANBAN_NOTES, (kanbanNotes) => ({ kanbanNotes }));
const setKanbanStep   = createAction(SET_KANBAN_STEP, (newState) => ({ newState }));
const editKanbanStep  = createAction(EDIT_KANBAN_STEP, (noteId) => ({ noteId }));
/* note - CRUD / detail -------------------------------------------------- */
const addNote         = createAction(ADD_NOTE, (newNote) => ({ newNote }));
const getNoteDetail   = createAction(GET_NOTE_DETAIL, (note) => ({ note }));
const editNote        = createAction(EDIT_NOTE, (noteId) => ({ noteId }));
const deleteNote      = createAction(DELETE_NOTE, (noteId) => ({ noteId }));
const setModifiedNote = createAction(SET_MODIFIED_NOTE, (detail, files) => ({ detail, files }));
/* bookmark - add / delete ----------------------------------------------- */
const addBookmark     = createAction(ADD_BOOKMARK, (noteId) => ({ noteId }));
const deleteBookmark  = createAction(DELETE_BOOKMARK, (noteId) => ({ noteId }));
/* file preview - add / delete ------------------------------------------- */
const setPreview      = createAction(SET_PREVIEW, (fileName, awsFileName, fileUrl) => ({ fileName, awsFileName, fileUrl }));
const resetPreview    = createAction(RESET_PREVIEW, () => ({}));
const deletePreview   = createAction(DELETE_PREVIEW, (fileUrl) => ({ fileUrl }));
const setListPreview  = createAction(SET_LIST_PREVIEW, (fileList) => ({ fileList }));
/* loading - for spinner ------------------------------------------------- */
const loading         = createAction(LOADING, (isLoading) => ({ isLoading }));
/* ----------------------------------------------------------------------- */

/**
 * --------------------------------------------------------------------------
 * middleware thunk function
  * 비고: 함수명 앞 __ REST API 요청 미들웨어
 * --------------------------------------------------------------------------
 */

/* project - kanban ------------------------------------------------------ */
const __getKanbanNotes =
  (projectId) =>
  async (dispatch, getState, { history }) => {
    try {
      dispatch(loading(true));
      const { data } = await noteApi.getKanbanNotes(projectId);
      dispatch(getKanbanNotes(data.projects));
    } catch (e) {
      console.log(e);
    }
  };

/* note - detail --------------------------------------------------------- */
const __getNoteDetail =
  (noteId) =>
  async (dispatch, getState, { history }) => {
    try {
      dispatch(loading(true));
      const { data } = await noteApi.getNoteDetail(noteId);
      // console.log("노트 상세 응답",  data);
      dispatch(getNoteDetail(data));
    } catch (e) {
      console.log(e);
    }
  };

/* note - CRUD ----------------------------------------------------------- */
const __addNote =
  (projectId, newNote) =>
  async (dispatch, getState, { history }) => {
    const files = getState().noteKanban.filePreview ? getState().noteKanban.filePreview : [];
    // awsFileName 제거
    files.map((file) => delete file.awsFileName);
    const _newNote = { ...newNote, files: files };
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
    const detail = getState().noteKanban.detail.detail;
    const content = detail?.content;
    const title = detail?.title;
    const deadline = detail?.deadline;

    const files = getState().noteKanban.filePreview ? getState().noteKanban.filePreview : [];

    // awsFileName 제거
    files.map((file) => delete file.awsFileName);
    // fileId가 있는 것과 없는 것 분리
    const oldFiles = files.filter((file) => "fileId" in file);
    const newFiles = files.filter((file) => !("fileId" in file));
    // 없는 파일은 fileId : 0 ; 추가
    newFiles.forEach((newFile) => (newFile.fileId = 0));
    const _newFileList = oldFiles.concat(newFiles);
    // 요청 바디 꾸리기
    const _newModifiedNote = {
      ...modifiedNote,
      // content: ( modifiedNote.content === undefined ? content : modifiedNote.content ),
      // title: ( modifiedNote.title === undefined ? title : modifiedNote.title ),
      // deadline: ( modifiedNote.deadline === undefined ? deadline : modifiedNote.deadline ),
      files: _newFileList,
    };
    try {
      const { data } = await noteApi.editNote(noteId, _newModifiedNote);
      delete data["files"];
      dispatch(setModifiedNote(data, _newFileList));
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

/* bookmark - add / delete ----------------------------------------------- */  
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

/**
 * --------------------------------------------------------------------------
 * reducer
 * --------------------------------------------------------------------------
 */

const noteKanban = handleActions(
  {
    [SET_KANBAN_STEP]: (state, action) => {
      return {
        ...state,
        kanban: action.payload.newState,
        isLoading: false,
      };
    },
    [GET_KANBAN_NOTES]: (state, action) => {
      return {
        ...state,
        kanban: action.payload.kanbanNotes,
        isLoading: false,
      };
    },
    [GET_NOTE_DETAIL]: (state, action) => {
      return {
        ...state,
        detail: action.payload.note,
        isLoading: false,
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
        isLoading: false,
      };
    },
    [SET_MODIFIED_NOTE]: (state, action) => {
      return {
        ...state,
        detail: {
          detail: { ...state.detail.detail, ...action.payload.detail },
          files: action.payload.files,
        },
        isLoading: false,
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
          detail: { ...state.detail.detail, isBookmark: true },
        },
      };
    },
    [DELETE_BOOKMARK]: (state, action) => {
      return {
        ...state,
        detail: {
          ...state.detail,
          detail: { ...state.detail.detail, isBookmark: false },
        },
      };
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
          },
        ],
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
        isLoading: action.payload.isLoading,
      };
    },
  },
  initialState,
);

/**
 * --------------------------------------------------------------------------
 * export actions
 * --------------------------------------------------------------------------
 */

export const noteKanbanActions = {
  /* project - kanban */
  __getKanbanNotes,
  setKanbanStep,
  /* note - CRUD / detail */
  __addNote,
  __getNoteDetail,
  __editNote,
  __deleteNote,
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
