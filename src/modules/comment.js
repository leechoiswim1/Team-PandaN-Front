import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { commentApi } from "../shared/api";

/* == Comments - initial state */
const initialState = {
  list: [
    {
      commentList: [
        {
          commentId: 5,
          content: "댓글내용",
          writer: "호랑이",
        },
        {
          commentId: 6,
          content: "댓글내용2",
          writer: "뱀",
        },
      ],
    },
  ],
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
const editComment = createAction(EDIT_COMMENT, (commentId, comment) => ({ commentId, comment }));

/* == thunk function */
const __getCommentList =
  (noteId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await commentApi.getCommentList(noteId);
      console.log(data.data);
      dispatch(getCommentList(data.data));
    } catch (e) {
      console.log(e);
    }
  };

const __postComment =
  (noteId, comment) =>
  async (dispatch, getState, { history }) => {
    console.log(noteId, comment);
    try {
      const { data } = await commentApi.postComment(noteId, comment);
      console.log(data.data);
      dispatch(postComment(data.data));
    } catch (e) {
      console.log(e);
    }
  };

/* == reducer */
export default handleActions(
  {
    [GET_COMMENT_LIST]: (state, action) =>
      produce(state, (draft) => {
        console.log(...action.payload);
        draft.list = [...action.payload.commentList];
      }),
    [POST_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // 데이터를 배열 맨 앞에 넣어줍니다.
        draft.list.unshift(action.payload.commentList);
      }),
  },
  initialState,
);

/* == export actions */

const actionCreators = {
  getCommentList,
  postComment,
  __getCommentList,
  __postComment,
};

export { actionCreators };
