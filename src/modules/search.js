import { createAction, handleActions } from "redux-actions";
import { searchApi } from "../shared/api";

/* == Comments - initial state */
const initialState = {
	list: [
    {
      noteId: "",
      title: "",
      step: "",
      projectId: "",
      projectTitle: "",
      writer: ""
    },
  ],
};

/* == action */
const GET_SEARCH_LIST =  "search/GET_SEARCH_LIST";

/* == action creator */
const getSearchList =  createAction(GET_SEARCH_LIST, data => (data));

/* == thunk function */
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

/* == reducer */
const search = handleActions(
  {
    [GET_SEARCH_LIST]: (state, action) => {     
      return {
        ...state,
        list: action.payload.data
      };
    },
  },
  initialState, 
);

/* == export actions */
export const searchActions = {
  __getSearchList,
};

export default search;