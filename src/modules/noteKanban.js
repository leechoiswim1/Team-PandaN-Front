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
};

/* == action */
/* project - kanban */
const GET_KANBAN_NOTES = "note_kanban/GET_KANBAN_NOTES";
const SET_KANBAN_STEP = "note_kanban/SET_KANBAN_STEP";
const EDIT_KANBAN_STEP = "note_kanban/GET_KANBAN_NOTES";
/* note - detail */
const GET_NOTE_DETAIL = "note_kanban/GET_NOTE_DETAIL";
/* note - CRUD */
const ADD_NOTE = "note_kanban/ADD_NOTE";
const EDIT_NOTE = "note_kanban/EDIT_NOTE";
const DELETE_NOTE = "note_kanban/DELETE_NOTE";
const SET_MODIFIED_NOTE = "note_kanban/SET_MODIFIED_NOTE";
/* bookmark - add / delete */
const ADD_BOOKMARK = "note_kanban/ADD_BOOKMARK";
const DELETE_BOOKMARK = "note_kanban/DELETE_BOOKMARK";

/* == action creator */
/* project - kanban */
const getKanbanNotes = createAction(GET_KANBAN_NOTES, (kanbanNotes) => ({ kanbanNotes }));
const setKanbanStep = createAction(SET_KANBAN_STEP, (newState) => ({ newState }));
const editKanbanStep = createAction(EDIT_KANBAN_STEP, (noteId) => ({ noteId }));
/* note - detail */
const getNoteDetail = createAction(GET_NOTE_DETAIL, (note) => ({ note }));
/* note - CRUD */
const addNote = createAction(ADD_NOTE, (newNote) => ({ newNote }));
const editNote = createAction(EDIT_NOTE, (noteId) => ({ noteId }));
const deleteNote = createAction(DELETE_NOTE, (noteId) => ({ noteId }));
const setModifiedNote = createAction(SET_MODIFIED_NOTE, (modifiedNote) => ({ modifiedNote }));
/* bookmark - add / delete */
const addBookmark = createAction(ADD_BOOKMARK, (noteId) => ({ noteId }));
const deleteBookmark = createAction(DELETE_BOOKMARK, (noteId) => ({ noteId }));


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
    try {
      const { data } = await noteApi.addNote(projectId, newNote);
      dispatch(addNote(data));
    } catch (e) {
      console.log(e);
    }
  };

const __editNote =
  (noteId, modifiedNote) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await noteApi.editNote(noteId, modifiedNote);
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
  },  
  initialState,
);

/* == export actions */
export const noteKanbanActions = {
  /* project - kanban */
  __getKanbanNotes,
  __editKanbanStep,
  setKanbanStep,
  /* note - detail */
  __getNoteDetail,
  /* note - CRUD */
  __addNote,
  __editNote,
  __deleteNote,
  /* bookmark - add / delete */
  __addBookmark,
  __deleteBookmark,
};

export default noteKanban;
