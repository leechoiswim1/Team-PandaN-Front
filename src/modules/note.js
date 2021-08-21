import { createAction, handleActions } from "redux-actions";
import { noteApi } from "../shared/api";
import { produce } from "immer";

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

  paging: { first: null, last: null, size: 10, pageNumber: 1, totalElements: 0, totalPages: 0 },
  bookPaging: { first: null, last: null, size: 10, pageNumber: 1, totalElements: 0, totalPages: 0 },
  issuePaging: { first: null, last: null, size: 10, pageNumber: 1, totalElements: 0, totalPages: 0 },
  projectNotePaging: { first: null, last: null, size: 10, pageNumber: 1, totalElements: 0, totalPages: 0 },
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
};

/* == action */
/* project - issue */
const GET_PROJECT_ISSUE = "note/GET_PROJECT_ISSUE";
const GET_PROJECT_MY_NOTES = "note/GET_PROJECT_MY_NOTES";
/* bookmark */
const GET_BOOKMARK = "note/GET_BOOKMARK";
const SET_BOOKMARK = "note/SET_BOOKMARK";
/* my note */
const GET_MY_NOTES = "note/GET_MY_NOTES";

const LOADING = "LOADING";

/* == action creator */
/* project - issue */
const getProjectIssue = createAction(GET_PROJECT_ISSUE, (pagingInfo) => ({ pagingInfo }));
const getProjectMyNotes = createAction(GET_PROJECT_MY_NOTES, (pagingInfo) => ({ pagingInfo }));
/* bookmark */
const getBookmark = createAction(GET_BOOKMARK, (pagingInfo) => ({ pagingInfo }));
const setBookmark = createAction(SET_BOOKMARK, (noteId) => ({ noteId }));
/* my note */
const getMyNotes = createAction(GET_MY_NOTES, (pagingInfo) => ({ pagingInfo }));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

/* == thunk function */
/* project - issue */
const __getProjectIssue =
  (projectId, page, size) =>
  async (dispatch, getState, { history }) => {
    try {
      dispatch(loading(true));
      const { data } = await noteApi.getProjectIssue(projectId, page, size);
      dispatch(getProjectIssue(data));
    } catch (e) {
      console.log(e);
    }
  };

const __getProjectMyNotes =
  (projectId, page, size) =>
  async (dispatch, getState, { history }) => {
    try {
      dispatch(loading(true));
      const { data } = await noteApi.getProjectMyNotes(projectId, page, size);
      dispatch(getProjectMyNotes(data));
    } catch (e) {
      console.log(e);
    }
  };

/* bookmark */
const __getBookmark =
  (page, size) =>
  async (dispatch, getState, { history }) => {
    try {
      dispatch(loading(true));
      const { data } = await noteApi.getBookmark(page, size);
      dispatch(getBookmark(data));
    } catch (e) {
      console.log(e);
    }
  };

/* my note */
const __getMyNote =
  (page, size) =>
  async (dispatch, getState, { history }) => {
    try {
      dispatch(loading(true));
      const { data } = await noteApi.getMyNotes(page, size);
      dispatch(getMyNotes(data));
    } catch (e) {
      console.log(e);
    }
  };

/* == reducer */
const note = handleActions(
  {
    [GET_PROJECT_ISSUE]: (state, action) =>
      produce(state, (draft) => {
        const myIssue = { ...action.payload.pagingInfo };
        draft.projectIssue = myIssue.notes;
        draft.issuePaging.first = myIssue.first;
        draft.issuePaging.last = myIssue.last;
        draft.issuePaging.pageNumber = myIssue.pageNumber;
        draft.issuePaging.totalElements = myIssue.totalElements;
        draft.issuePaging.totalPages = myIssue.totalPages;
        draft.is_loading = false;
      }),

    [GET_PROJECT_MY_NOTES]: (state, action) =>
      produce(state, (draft) => {
        const myProjectNote = { ...action.payload.pagingInfo };
        draft.projectMyNote = myProjectNote.myNoteList;
        draft.projectNotePaging.first = myProjectNote.first;
        draft.projectNotePaging.last = myProjectNote.last;
        draft.projectNotePaging.pageNumber = myProjectNote.pageNumber;
        draft.projectNotePaging.totalElements = myProjectNote.totalElements;
        draft.projectNotePaging.totalPages = myProjectNote.totalPages;
        draft.is_loading = false;
      }),

    /* Bookmark */
    [GET_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        const myBookmark = { ...action.payload.pagingInfo };
        draft.bookmark = myBookmark.noteList;
        draft.bookPaging.first = myBookmark.first;
        draft.bookPaging.last = myBookmark.last;
        draft.bookPaging.pageNumber = myBookmark.pageNumber;
        draft.bookPaging.totalElements = myBookmark.totalElements;
        draft.bookPaging.totalPages = myBookmark.totalPages;
        draft.is_loading = false;
      }),

    [SET_BOOKMARK]: (state, action) => {
      return {
        ...state,
        bookmark: state.bookmark.filter((note) => note.noteId !== action.payload.noteId),
      };
    },

    /* my note */

    [GET_MY_NOTES]: (state, action) =>
      produce(state, (draft) => {
        const myNote = { ...action.payload.pagingInfo };
        draft.myNote = myNote.myNoteList;
        draft.paging.first = myNote.first;
        draft.paging.last = myNote.last;
        draft.paging.pageNumber = myNote.pageNumber;
        draft.paging.totalElements = myNote.totalElements;
        draft.paging.totalPages = myNote.totalPages;
        draft.is_loading = false;
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState,
);

/* == export actions */
export const noteActions = {
  /* project - issue */
  __getProjectIssue,
  __getProjectMyNotes,
  /* bookmark */
  setBookmark,
  __getBookmark,
  /* my note */
  __getMyNote,
};

export default note;
