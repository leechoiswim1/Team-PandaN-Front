import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { projectApi } from "../shared/api"; // 필요한 api 함수 불러 올 것

const initialState = {
  user: null,
  is_login: false,
};

export default handleActions({}, initialState);

const actionCreators = {};

export { actionCreators };
