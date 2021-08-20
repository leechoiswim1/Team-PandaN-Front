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
const getProjectIssue = createAction(GET_PROJECT_ISSUE, (issueNotes) => ({ issueNotes }));
const getProjectMyNotes = createAction(GET_PROJECT_MY_NOTES, (myNoteList) => ({ myNoteList }));
/* bookmark */
const getBookmark = createAction(GET_BOOKMARK, (myBookmarkNoteList) => ({ myBookmarkNoteList }));
const setBookmark = createAction(SET_BOOKMARK, (noteId) => ({ noteId }));
/* my note */
const getMyNotes = createAction(GET_MY_NOTES, (myNoteList, paging) => ({ myNoteList, paging }));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

/* == thunk function */
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
