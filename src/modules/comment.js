import { createAction, handleActions } from "redux-actions";
import { commentApi } from "../shared/api";

/* == Comments - initial state */
const initialState = {
	list: [],
};

/* == action */
const GET_COMMENT_LIST =  "note/GET_COMMENT_LIST";

/* == action creator */
const getCommentList =  createAction(GET_COMMENT_LIST, data => (data));

/* == thunk function */
const __getCommentList =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await commentApi.getCommentList();
      dispatch(getCommentList(data));
    } catch (e) {
      console.log(e);
    }
  };

/* == reducer */
const comment = handleActions(
  {
    [GET_COMMENT_LIST]: (state, action) => {     
      return {
        ...state,
        list: action.payload.data
      };
    },
  },
  initialState, 
);

/* == export actions */
export const commentActions = {
  __getCommentList,
};

export default comment;
