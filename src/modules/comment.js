import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { commentApi } from "../shared/api";

/* == Comments - initial state */
const initialState = {
  list: [],
};

/* == action */
const GET_COMMENT_LIST = "GET_COMMENT_LIST";
const POST_COMMENT = "POST_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";

/* == action creator */
const getCommentList = createAction(GET_COMMENT_LIST, (data) => data);
const postComment = createAction(POST_COMMENT, (comment) => ({ comment }));
const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({ commentId }));
const editComment = createAction(EDIT_COMMENT, (comment) => comment);

/* == thunk function */
const __getCommentList =
  (noteId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await commentApi.getCommentList(noteId);
      dispatch(getCommentList(data));
    } catch (e) {
      console.log(e);
    }
  };

const __postComment =
  (noteId, comment) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await commentApi.postComment(noteId, comment);
      dispatch(postComment(data));
    } catch (e) {
      console.log(e);
    }
  };

const __deleteComment =
  (commentId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await commentApi.deleteComment(commentId);
      dispatch(deleteComment(data.commentId));
    } catch (e) {
      console.log(e);
    }
  };

const __editComment =
  (commentId, comment) =>
  async (dispatch, getState, { history }) => {
    try {
      console.log(commentId, comment);
      const { data } = await commentApi.putComment(commentId, comment);
      console.log(data);
      dispatch(editComment(data));
    } catch (e) {
      console.log(e);
    }
  };
/* == reducer */
export default handleActions(
  {
    [GET_COMMENT_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [...action.payload.commentList];
      }),
    [POST_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // 데이터를 배열 맨 앞에 넣어줍니다.
        draft.list.push(action.payload.comment);
      }),

    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.commentId === action.payload.commentId);
        if (idx !== -1) {
          // 배열에서 idx 위치의 요소 1개를 지웁니다.
          draft.list.splice(idx, 1);
        }
      }),
    [EDIT_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        let idx = draft.list.findIndex((p) => p.commentId === action.payload.commentId);
        if (idx !== -1) {
          draft.list[idx].content = action.payload.content;
        }
      }),
  },
  initialState,
);

/* == export actions */

const actionCreators = {
  getCommentList,
  postComment,
  deleteComment,
  editComment,
  __getCommentList,
  __postComment,
  __deleteComment,
  __editComment,
};

export { actionCreators };
