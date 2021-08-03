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
          "title": "dnd 로직 적용하기",
          "content": "적용 후 테스트 하기",
          "deadline": "2021-08-10"
        },
        {
          "noteId": 2,
          "title": "api 테스트 페이지 만들기",
          "content": "서버 연동 후 api 테스트 준비하기",
          "deadline": "2021-08-01"
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
};

/* == action */
const SET_KANBAN_STEP =  "note/SET_KANBAN_STEP";
const GET_KANBAN_NOTES = "note/GET_KANBAN_NOTES";

/* == action creator */
const setKanbanStep =  createAction(SET_KANBAN_STEP, newState => ({ newState }));
const getKanbanNotes = createAction(GET_KANBAN_NOTES, data => ({ data }));

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
  },
  initialState, 
);

/* == export actions */
export const noteActions = {
  setKanbanStep,
  __getKanbanNotes,
};

export default note;
