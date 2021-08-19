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
  bookmark: [],
  myNote: [],
  projectIssue: [],
  projectMyNote: [],
  detail: {
    content: "",
    deadline: "",
    noteId: 0,
    step: "",
    title: "",
    isBookmark: false,
  },
  paging: { page: 1, next: null, size: 8 },
  is_loading: false,
};

/* == action */
/* project - kanban */
const SET_KANBAN_STEP = "note/SET_KANBAN_STEP";
const GET_KANBAN_NOTES = "note/GET_KANBAN_NOTES";
/* project - issue */
const GET_PROJECT_ISSUE = "note/GET_PROJECT_ISSUE";
const GET_PROJECT_MY_NOTES = "note/GET_PROJECT_MY_NOTES";
/* note - detail */
const GET_NOTE_DETAIL = "note/GET_NOTE_DETAIL";
/* note - CRUD */
const ADD_NOTE = "note/ADD_NOTE";
const EDIT_NOTE = "note/EDIT_NOTE";
const DELETE_NOTE = "note/DELETE_NOTE";
const SET_MODIFIED_NOTE = "note/SET_MODIFIED_NOTE";
/* bookmark */
const GET_BOOKMARK = "note/GET_BOOKMARK";
const SET_BOOKMARK = "note/SET_BOOKMARK";
const ADD_BOOKMARK = "note/ADD_BOOKMARK";
const DELETE_BOOKMARK = "note/DELETE_BOOKMARK";
/* my note */
const GET_MY_NOTES = "note/GET_MY_NOTES";

const LOADING = "LOADING";

/* == action creator */
/* project - kanban */
const setKanbanStep = createAction(SET_KANBAN_STEP, (newState) => ({ newState }));
const getKanbanNotes = createAction(GET_KANBAN_NOTES, (kanbanNotes) => ({ kanbanNotes }));
/* project - issue */
const getProjectIssue = createAction(GET_PROJECT_ISSUE, (issueNotes) => ({ issueNotes }));
const getProjectMyNotes = createAction(GET_PROJECT_MY_NOTES, (myNoteList) => ({ myNoteList }));
/* note - detail */
const getNoteDetail = createAction(GET_NOTE_DETAIL, (note) => ({ note }));
/* note - CRUD */
const addNote = createAction(ADD_NOTE, (newNote) => ({ newNote }));
const editNote = createAction(EDIT_NOTE, (noteId) => ({ noteId }));
const deleteNote = createAction(DELETE_NOTE, (noteId) => ({ noteId }));
const setModifiedNote = createAction(SET_MODIFIED_NOTE, (modifiedNote) => ({ modifiedNote }));
/* bookmark */
const getBookmark = createAction(GET_BOOKMARK, (myBookmarkNoteList) => ({ myBookmarkNoteList }));
const setBookmark = createAction(SET_BOOKMARK, (noteId) => ({ noteId }));
const addBookmark = createAction(ADD_BOOKMARK, (noteId) => ({ noteId }));
const deleteBookmark = createAction(DELETE_BOOKMARK, (noteId) => ({ noteId }));
/* my note */
const getMyNotes = createAction(GET_MY_NOTES, (myNoteList, paging) => ({ myNoteList, paging }));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

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
      // let notes = [];
      // notes.push(data.notes);
      // dispatch(getProjectIssue(notes));
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
      // let myNoteList = [];
      // myNoteList.push(data.myNoteList);
      // dispatch(getProjectMyNotes(myNoteList));
      dispatch(getProjectMyNotes(data.myNoteList));
    } catch (e) {
      console.log(e);
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

/* bookmark */
const __getBookmark =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await noteApi.getBookmark();
      // 
      // let bookmarkList = [];
      // bookmarkList.push(data.noteList);
      // dispatch(getBookmark(bookmarkList));
      dispatch(getBookmark(data.noteList))
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

/* my note */
const __getMyNote =
  (page = 1, size = initialState.paging.size) =>
  async (dispatch, getState, { history }) => {

    const _next = getState().note.paging.next;
    const _page = getState().note.paging.page;
    // 이 부분 첫페이지를 불러와야하는지 마지막페이지라서 불러올 게 없는지 감지하는게 매끄럽지 않습니다.
    
    if (_page === false && _next === false) return;
    dispatch(loading(true));

    try {
      const { data } = await noteApi.getMyNotes(page, size);
      let myNoteList = [];

      const isNextPage = data.myNoteList.length;
      
      
      let paging = {
        page: isNextPage < initialState.paging.size ? 1 : page + 1,
        next: isNextPage < initialState.paging.size ? false : true,
        size: size,
      };
      
      myNoteList.push(data.myNoteList);
      if (paging.next) {
        myNoteList.pop();
      }

      dispatch(getMyNotes(data.myNoteList, paging));
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
        kanban: action.payload.newState,
      };
    },
    [GET_KANBAN_NOTES]: (state, action) => {
      return {
        ...state,
        kanban: action.payload.kanbanNotes,
      };
    },
    [GET_PROJECT_ISSUE]: (state, action) => {
      return {
        ...state,
        projectIssue: action.payload.issueNotes,
        // projectIssue: state.projectIssue.concat(action.payload.issueNotes),
      };
    },
    [GET_PROJECT_MY_NOTES]: (state, action) => {
      return {
        ...state,
        projectMyNote: action.payload.myNoteList,
        // projectMyNote: state.projectMyNote.concat(action.payload.myNoteList),
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
    /* Bookmark */
    [GET_BOOKMARK]: (state, action) => {
      return {
        ...state,
        bookmark: action.payload.myBookmarkNoteList,
        // bookmark: state.bookmark.concat(action.payload.myBookmarkNoteList),
      };
    },
    [SET_BOOKMARK]: (state, action) => {
      return {
        ...state,
        bookmark: state.bookmark.filter((note) => note.noteId !== action.payload.noteId),
      };
    },
    [ADD_BOOKMARK]: (state, action) => {
      return {
        ...state,
        detail: { ...state.detail, isBookmark: true },
      };
    },
    [DELETE_BOOKMARK]: (state, action) => {
      return {
        ...state,
        detail: { ...state.detail, isBookmark: false },
      };
    },
    /* my note */

    [GET_MY_NOTES]: (state, action) => 
    produce(state, (draft) => {
      draft.myNote.push(...action.payload.myNoteList);
      draft.paging = action.payload.paging;
      draft.isLoading = false;
    }),
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
  setBookmark,
  __getBookmark,
  __addBookmark,
  __deleteBookmark,
  /* my note */
  __getMyNote,
};

export default note;
