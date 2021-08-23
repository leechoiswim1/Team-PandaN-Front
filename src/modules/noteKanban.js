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
  filePreview: []
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
/* bookmark - add / delete */
const ADD_BOOKMARK      = "note_bookmark/ADD_BOOKMARK";
const DELETE_BOOKMARK   = "note_bookmark/DELETE_BOOKMARK";
/* file preview - add / delete */
const SET_PREVIEW       = "note_file/SET_PREVIEW";
const RESET_PREVIEW     = "note_file/RESET_PREVIEW";
const DELETE_PREVIEW    = "note_file/DELETE_PREVIEW";
const SET_LIST_PREVIEW  = "note_file/SET_LIST_PREVIEW";

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
/* bookmark - add / delete */
const addBookmark = createAction(ADD_BOOKMARK, (noteId) => ({ noteId }));
const deleteBookmark = createAction(DELETE_BOOKMARK, (noteId) => ({ noteId }));
/* file preview - add / delete */
const setPreview    = createAction(SET_PREVIEW, ( fileName, awsFileName, fileUrl ) => ({ fileName, awsFileName, fileUrl }));
const resetPreview  = createAction(RESET_PREVIEW, () => ({}));
const deletePreview = createAction(DELETE_PREVIEW, ( fileUrl ) => ({ fileUrl }));
const setListPreview = createAction(SET_LIST_PREVIEW, ( fileList ) => ({ fileList }));

/* == thunk function */
/* kanban */
const __getKanbanNotes =
  (projectId) =>
  async (dispatch, getState, { history }) => {
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
    try {
      const { data } = await noteApi.getNoteDetail(noteId);
      dispatch(getNoteDetail(data));
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

    const _newModifiedNote = {
      // ...modifiedNote,
      // files: [...modifiedNote.files, ...files] 
    }
    // console.log("요청 보내기 전", _newModifiedNote)
    try {
      const { data } = await noteApi.editNote(noteId, _newModifiedNote);
      dispatch(setModifiedNote(data));
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
      };
    },
    [GET_KANBAN_NOTES]: (state, action) => {
      return {
        ...state,
        kanban: action.payload.kanbanNotes,
      };
    },
    [GET_NOTE_DETAIL]: (state, action) => {
      return {
        ...state,
        detail: action.payload.note,
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
