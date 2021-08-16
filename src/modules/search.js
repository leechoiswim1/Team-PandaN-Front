import { createAction, handleActions } from "redux-actions";
import { searchApi } from "../shared/api";

/* == Comments - initial state */
const initialState = {
	list: [],
};

/* == action */
const GET_SEARCH_LIST =  "note/GET_COMMENT_LIST";

/* == action creator */
const getSearchList =  createAction(GET_SEARCH_LIST, data => (data));