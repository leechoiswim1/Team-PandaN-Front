import { createAction, handleActions } from "redux-actions";
import { noteApi } from "../shared/api";

/* == Notes - initial state */
const initialState = {
  list: [
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
    content: "실전 프로젝트 마무리 및 항해 완주",
    deadline: "2021-09-10",
    noteId: 0,
    step: "TODO",
    title: "항해 완주",
  },
};

/* == action */
const SET_KANBAN_STEP = "note/SET_KANBAN_STEP";
const GET_KANBAN_NOTES = "note/GET_KANBAN_NOTES";
const GET_NOTE_DETAIL = "note/GET_NOTE_DETAIL";
const EDIT_NOTE = "note/EDIT_NOTE";
/* == action - bookmark */
const ADD_BOOKMARK = "note/ADD_BOOKMARK";
const DELETE_BOOKMARK = "note/DELETE_BOOKMARK";

/* == action creator */
const setKanbanStep = createAction(SET_KANBAN_STEP, newState => ({ newState }));
const getKanbanNotes = createAction(GET_KANBAN_NOTES, data => ({ data }));
const getNoteDetail = createAction(GET_NOTE_DETAIL, note => ({ note }));
const editNote = createAction(EDIT_NOTE, note => ({ note }));
/* == action creator - bookmark */
const addBookmark = createAction(ADD_BOOKMARK, noteId => ({ noteId }));
const deleteBookmark = createAction(DELETE_BOOKMARK, noteId => ({ noteId }));

/* == thunk function */
const __getKanbanNotes =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await noteApi.getKanbanNotes();
      dispatch(getKanbanNotes(data.projects));
    } catch (e) {
      console.log(e);
    }
  };

const __getNoteDetail =
  noteId =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await noteApi.getNoteDetail(noteId);
      dispatch(getNoteDetail(data));
    } catch (e) {
      console.log(e);
    }
  };

const __editNote =
  (noteId, modifiedNote) =>
  async (dispatch, getState, { history }) => {
    try {
      console.log(modifiedNote);
      const newNote = {
        title: modifiedNote.title,
        content: modifiedNote.content,
        deadline: modifiedNote.deadline,
        step: modifiedNote.step,
      };
      const { data } = await noteApi.editNote(noteId, newNote);
      console.log(data);
      // dispatch(getNoteDetail(data))
    } catch (e) {
      console.log(e);
    }
  };

/* == thunk function - bookmark */
const __addBookmark =
  noteId =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await noteApi.addBookmark(noteId);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

const __deleteBookmark =
  noteId =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await noteApi.deleteBookmark(noteId);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

/* == reducer */
const note = handleActions(
  {
    [SET_KANBAN_STEP]: (state, action) => {
      return {
        ...state,
        list: action.payload.newState,
      };
    },
    [GET_KANBAN_NOTES]: (state, action) => {
      return {
        ...state,
        list: action.payload.data,
      };
    },
    [GET_NOTE_DETAIL]: (state, action) => {
      return {
        ...state,
        detail: action.payload.note,
      };
    },
  },
  initialState,
);

/* == export actions */
export const noteActions = {
  setKanbanStep,
  __getKanbanNotes,
  __getNoteDetail,
  __editNote,
  /* bookmark */
  __addBookmark,
  __deleteBookmark,
};

export default note;
