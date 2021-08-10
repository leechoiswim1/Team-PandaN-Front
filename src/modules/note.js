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
/* project - kanban */
const SET_KANBAN_STEP         = "note/SET_KANBAN_STEP";
const GET_KANBAN_NOTES        = "note/GET_KANBAN_NOTES";
/* project - issue */
const GET_PROJECT_ISSUE       = "note/GET_PROJECT_ISSUE";
const GET_PROJECT_MY_NOTES    = "note/GET_PROJECT_MY_NOTES";
/* note - detail */
const GET_NOTE_DETAIL         = "note/GET_NOTE_DETAIL";
/* note - CRUD */
const ADD_NOTE                = "note/ADD_NOTE";
const EDIT_NOTE               = "note/EDIT_NOTE";
const DELETE_NOTE             = "note/DELETE_NOTE";
/* bookmark */
const GET_BOOKMARK            = "note/GET_BOOKMARK";
const ADD_BOOKMARK            = "note/ADD_BOOKMARK";
const DELETE_BOOKMARK         = "note/DELETE_BOOKMARK";
/* my note */
const GET_MY_NOTES            = "note/GET_MY_NOTES";

/* == action creator */
/* project - kanban */
const setKanbanStep           = createAction(SET_KANBAN_STEP, newState => ({ newState }));
const getKanbanNotes          = createAction(GET_KANBAN_NOTES, kanbanNotes => ({ kanbanNotes }));
/* project - issue */
const getProjectIssue         = createAction(GET_PROJECT_ISSUE, issueNotes => ({ issueNotes }));
const getProjectMyNotes       = createAction(GET_PROJECT_MY_NOTES, myNoteList => ({ myNoteList }));
/* note - detail */
const getNoteDetail           = createAction(GET_NOTE_DETAIL, note => ({ note }));
/* note - CRUD */
const addNote                 = createAction(ADD_NOTE, noteId => ({ noteId }));
const editNote                = createAction(EDIT_NOTE, noteId => ({ noteId }));
const deleteNote              = createAction(DELETE_NOTE, noteId => ({ noteId }));
/* bookmark */
const getBookmark             = createAction(GET_BOOKMARK, myBookmarkNoteList => ({ myBookmarkNoteList }));
const addBookmark             = createAction(ADD_BOOKMARK, noteId => ({ noteId }));
const deleteBookmark          = createAction(DELETE_BOOKMARK, noteId => ({ noteId }));
/* my note */
const getMyNotes              = createAction(GET_MY_NOTES, myNoteList => ({ myNoteList }));

/* == thunk function */
/* project issue */
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

/* project - issue */
const __getProjectIssue =
  (projectId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await noteApi.getProjectIssue(projectId);
      dispatch(getProjectIssue(data.notes));
    } catch (e) {
      console.log(e);
    }
  };

const __getProjectMyNotes =
(projectId) =>
async (dispatch, getState, { history }) => {
  try {
    const { data } = await noteApi.getProjectMyNotes(projectId);
    dispatch(getProjectMyNotes(data.myNoteList));
  } catch (e) {
    console.log(e);
  }
};


/* note - detail */
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

/* note - CRUD */
const __addNote =
  (noteId, newNote) =>
  async (dispatch, getState, { history }) => {
    try {
      const newNote = {
        title: newNote.title,
        content: newNote.content,
        deadline: newNote.deadline,
        step: newNote.step,
      };
      const { data } = await noteApi.addNote(noteId, newNote);
      console.log(data);
      // dispatch(addNote(data))
    } catch (e) {
      console.log(e);
    }
  };

const __editNote =
  (noteId, modifiedNote) =>
  async (dispatch, getState, { history }) => {
    try {  
      const newNote = {
        title: modifiedNote.title,
        content: modifiedNote.content,
        deadline: modifiedNote.deadline,
        step: modifiedNote.step,
      };
      const { data } = await noteApi.editNote(noteId, newNote);
      console.log(data);
      // dispatch(editNote(data))
    } catch (e) {
      console.log(e);
    }
  };
 
const __deleteNote =
  (noteId) =>
  async (dispatch, getState, { history }) => {
    try {  
      const { data } = await noteApi.deleteNote(noteId);
      // console.log("delete note, response", data);
      dispatch(deleteNote(noteId));
    } catch (e) {
      console.log(e);
    }
  };

/* bookmark */
const __getBookmark =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await noteApi.getBookmark();
      dispatch(getBookmark(data.noteList));
    } catch (e) {
      console.log(e);
    }
  };

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

/* my note */
const __getMyNote =
() =>
async (dispatch, getState, { history }) => {
  try {
    const { data } = await noteApi.getMyNotes();
    dispatch(getMyNotes(data.myNoteList));
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
        list: action.payload.kanbanNotes,
      };
    },
    [GET_PROJECT_ISSUE]: (state, action) => {
      return {
        ...state,
        list: action.payload.issueNotes,
      };
    },
    [GET_PROJECT_MY_NOTES]: (state, action) => {
      return {
        ...state,
        list: action.payload.myNoteList,
      };
    },
    [GET_NOTE_DETAIL]: (state, action) => {
      return {
        ...state,
        detail: action.payload.note,
      };
    },
    [ADD_NOTE]: (state, action) => {
      return {
        ...state,
        detail: action.payload.note,
      };
    },
    [EDIT_NOTE]: (state, action) => {
      // 배열에서 특정값을 찾아서 불변성 유지하면서 수정해주기
			const data = action.payload.newContent;
			return {
				...state,
				comments: state.comments.map((comment, idx) => {
					if (comment.id === data.id) {
						return (state.comments[idx] = data);
					} else {
						return comment;
					}
				}),
			};

    },
    [DELETE_NOTE]: (state, action) => {
      return {
        ...state,
        list: state.list.filter((note) => note.noteId !== action.payload.noteId)  
      };
    },
    [GET_BOOKMARK]: (state, action) => {
      return {
        ...state,
        list: action.payload.myBookmarkNoteList,
      };
    },
  },
  initialState,
);

/* == export actions */
export const noteActions = {
  /* project - kanban */
  setKanbanStep,
  __getKanbanNotes,
  /* project - issue */
  __getProjectIssue,
  __getProjectMyNotes,
  /* note - detail */
  __getNoteDetail,
  /* note - CRUD */
  __addNote,
  __editNote,
  __deleteNote,
  /* bookmark */
  __getBookmark,
  __addBookmark,
  __deleteBookmark,
  /* my note */
  __getMyNote,  
};

export default note;
