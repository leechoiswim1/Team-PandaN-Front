import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { projectApi } from "../shared/api"; // 필요한 api 함수 불러 올 것

const SET_PROJECT = "SET_PROJECT";
const ADD_PROJECT = "ADD_PROJECT";
const EDIT_PROJECT = "EDIT_PROJECT";
const DELETE_PROJECT = "DELETE_PROJECT";
const LOADING_PROJECT = "LOADING_PROJECT";

const setProject = createAction(SET_PROJECT, project_list => ({
  project_list,
}));
const addProject = createAction(ADD_PROJECT, project => ({ project }));
const editProject = createAction(EDIT_PROJECT, (project_id, project) => ({
  project_id,
  project,
}));
const deleteProject = createAction(DELETE_PROJECT, project_id => ({
  project_id,
}));
const loadingProject = createAction(LOADING_PROJECT, is_loading => ({
  is_loading,
}));

const initialState = {
  list: [],
};

// Thunk function
export const __getSomething =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await projectApi.getSomething();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

export default handleActions(
  {
    [ADD_PROJECT]: (state, action) =>
      produce(state, draft => {
        // 데이터를 배열 맨 앞에 넣어줍니다.
        draft.list.unshift(action.payload.project);
      }),

    [DELETE_PROJECT]: (state, action) =>
      produce(state, draft => {
        console.log(draft.list);
        let idx = draft.list.findIndex(p => p.id === action.payload.project_id);
        console.log(action.payload.project_id);

        if (idx !== -1) {
          // 배열에서 idx 위치의 요소 1개를 지웁니다.
          draft.list.splice(idx, 1);
        }
      }),
    [LOADING_PROJECT]: (state, action) =>
      produce(state, draft => {
        //   데이터를 가져오는 중인 지 여부를 작성합니다.
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState,
);

const actionCreators = {
  setProject,
  addProject,
  editProject,
  loadingProject,
  deleteProject,
};

export { actionCreators };