/**
 * --------------------------------------------------------------------------
 * Redux Module: search.js
  * 기능 (검색)
    * [전체] - 노트 제목 검색
    * [북마크] - 내가 북마크한 모든 북마크 중 북마크 제목 검색
    * [내가 작성한 문서] - 노트 제목 검색
 * --------------------------------------------------------------------------
 */

import { createAction, handleActions } from "redux-actions";
import { searchApi } from "../shared/api";

/**
 * ------------------------------------------------------------------------
 * initial state
 * ------------------------------------------------------------------------
 */

const initialState = {
	list: null,
};

/**
 * ------------------------------------------------------------------------
 * action
 * ------------------------------------------------------------------------
 */

/* == [Search] Result: 노트 검색 결과 */
const GET_SEARCH_LIST =  "search/GET_SEARCH_LIST";

/* == [Search] All: 노트 제목 검색 */
const GET_SEARCH_ALL =  "search/GET_SEARCH_ALL";

/* == [Search] BookMark: 내가 북마크한 모든 북마크 중 북마크 제목 검색 */
const GET_SEARCH_BOOKMARK =  "search/GET_SEARCH_BOOKMARK";

/* == [Search] MyNote: 노트 제목 검색 */
const GET_SEARCH_MYNOTE =  "search/GET_SEARCH_MYNOTE";

/* == [Search] deleteResult: 검색결과 삭제 */
const DELETE_SEARCH_RESULT =  "search/DELETE_SEARCH_RESULT";

/**
 * ------------------------------------------------------------------------
 * action creator
 * ------------------------------------------------------------------------
 */

/* == [Search] Result: 노트 검색 결과 */
const getSearchList = createAction(GET_SEARCH_LIST, searchResult => ({searchResult}));

/* == [Search] All: 노트 제목 검색 */
const getSearchAll = createAction(GET_SEARCH_ALL, (searchAll) => ({searchAll}));

/* == [Search] BookMark: 내가 북마크한 모든 북마크 중 북마크 제목 검색 */
const getSearchBookmark = createAction(GET_SEARCH_BOOKMARK, searchBookmark => ({searchBookmark}));

/* == [Search] MyNote: 노트 제목 검색 */
const getSearchMynote = createAction(GET_SEARCH_MYNOTE, searchMynote => ({searchMynote}));

/* == [Search] deleteResult: 검색결과 삭제 */
const deleteSearchResult = createAction(DELETE_SEARCH_RESULT, () => ({}));

/**
 * ------------------------------------------------------------------------
 * thunk function
 * ------------------------------------------------------------------------
 */

/* == [Search] Result: 노트 검색 결과 */
const __getSearchList =
  (keyword) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await searchApi.getSearchList(keyword);
      dispatch(getSearchList(data));
    } catch (e) {
      console.log(e);
    }
  };

/* == [Search] All: 노트 제목 검색 */
const __getSearchAll =
  (keyword) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await searchApi.getSearchAll(keyword);
      console.log("2." + data);
      dispatch(getSearchAll(data.noteList));
    } catch (e) {
      dispatch(deleteSearchResult());
      console.log(e);
    }
  };

/* == [Search] BookMark: 내가 북마크한 모든 북마크 중 북마크 제목 검색 */
const __getSearchBookmark =
  (keyword) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await searchApi.getSearchBookmark(keyword);
      dispatch(getSearchBookmark(data.noteList));
    } catch (e) {
      dispatch(deleteSearchResult());
      console.log(e);
    }
  };

/* == [Search] BookMark: 내가 북마크한 모든 북마크 중 북마크 제목 검색 */
const __getSearchMynote =
  (keyword) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await searchApi.getSearchMynote(keyword);
      dispatch(getSearchMynote(data.noteList));
    } catch (e) {
      dispatch(deleteSearchResult());
      console.log(e);
    }
  };

/**
 * ------------------------------------------------------------------------
 * reducer
 * ------------------------------------------------------------------------
 */

const search = handleActions(
  {
    [GET_SEARCH_LIST]: (state, action) => {     
      return {
        ...state,
        list: action.payload.searchResult
      };
    },
    [GET_SEARCH_ALL]: (state, action) => {    
      return {
        ...state,
        list: action.payload.searchAll
      };
    },
    [GET_SEARCH_BOOKMARK]: (state, action) => {     
      return {
        ...state,
        list: action.payload.searchBookmark
      };
    },
    [GET_SEARCH_MYNOTE]: (state, action) => {     
      return {
        ...state,
        list: action.payload.searchMynote
      };
    },
    [DELETE_SEARCH_RESULT]: (state, action) => {   
      return {
        ...state,
        list: [],
      };
    },
  },
  initialState, 
);

/**
 * ------------------------------------------------------------------------
 * export actions
 * ------------------------------------------------------------------------
 */

export const searchActions = {
  __getSearchList,
  __getSearchAll, 
  __getSearchBookmark,
  __getSearchMynote,
};

export default search;