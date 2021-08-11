import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { userApi } from "../shared/api"; // 필요한 api 함수 불러 올 것

const SET_USER = "SET_USER";

const setUser = createAction(SET_USER, (user) => ({
  user,
}));

const initialState = {
  user: [],
};

const __setUser =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const data = await userApi.getUser();
      console.log(data);
      dispatch(setUser(data.data));
    } catch (e) {
      console.log(e);
    }
  };

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.user);
        draft.user = [{ ...action.payload.user }];
      }),
  },
  initialState,
);

const actionCreators = {
  setUser,
  __setUser,
};

export { actionCreators };
