import { createAction, handleActions } from "redux-actions";
import { noteApi } from "../shared/api";

/* == Notes - initial state */
const initialState = {
	list: [
    {
      "step": "STORAGE",
      "notes": [
        {
          "noteId": 1,
          "title": "",
          "content": "",
          "deadline": ""
        },
      ]
    },
    {
    "step": "TODO",
    "notes": []
    },
    {
    "step": "PROCESSING",
    "notes": []
    },
    {
    "step": "DONE",
    "notes": []
    }
    ],
  detail: {
    "content": "",
    "deadline": "",
    "noteId": 0,
    "step": "",
    "title": "",
  }
};

/* == action */
const SET_KANBAN_STEP =  "note/SET_KANBAN_STEP";
const GET_KANBAN_NOTES = "note/GET_KANBAN_NOTES";
const GET_NOTE_DETAIL = "note/GET_NOTE_DETAIL";

/* == action creator */
const setKanbanStep =  createAction(SET_KANBAN_STEP, newState => ({ newState }));
const getKanbanNotes = createAction(GET_KANBAN_NOTES, data => ({ data }));
const getNoteDetail = createAction(GET_NOTE_DETAIL, note => ({ note }));

/* == thunk function */
const __getKanbanNotes =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await noteApi.getKanbanNotes();
      dispatch(getKanbanNotes(data.projects))
    } catch (e) {
      console.log(e);
    }
  };

const __getNoteDetail =
  (noteId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await noteApi.getNoteDetail(noteId);
      dispatch(getNoteDetail(data))
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
        list: action.payload.newState
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
};

export default note;
