import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { projectApi } from "../shared/api"; // 필요한 api 함수 불러 올 것

const SET_PROJECT = "SET_PROJECT";
const ADD_PROJECT = "ADD_PROJECT";
const DELETE_PROJECT = "DELETE_PROJECT";
const EDIT_PROJECT = "EDIT_PROJECT";

const setProject = createAction(SET_PROJECT, project_list => ({
  project_list,
}));

const addProject = createAction(ADD_PROJECT, project => ({ project }));

const deleteProject = createAction(DELETE_PROJECT, projectId => ({
  projectId,
}));

const editProject = createAction(EDIT_PROJECT, (projectId, project) => ({
  projectId,
  project,
}));

const initialState = {
  list: [],
};

const __setProject =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const data = await projectApi.getProject();
      console.log(data);
      dispatch(setProject(data.data.projects));
    } catch (e) {
      console.log(e);
    }
  };

const __setOneProject =
  projectId =>
  async (dispatch, getState, { history }) => {
    console.log(projectId);
    try {
      const { data } = await projectApi.getOneProject(projectId);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

const __postProject =
  project =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await projectApi.postProject(project);
      dispatch(addProject(data));
    } catch (e) {
      console.log(e);
    }
  };

const __deleteProject =
  projectId =>
  async (dispatch, getState, { history }) => {
    console.log(projectId);
    try {
      const { data } = await projectApi.deleteProject(projectId);
      dispatch(deleteProject(data.projectId));
    } catch (e) {
      console.log(e);
    }
  };

const __editProject =
  projectId =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await projectApi.editProject(projectId);
      dispatch(editProject(data.projectId));
    } catch (e) {
      console.log(e);
    }
  };

export default handleActions(
  {
    [SET_PROJECT]: (state, action) =>
      produce(state, draft => {
        draft.list = [...action.payload.project_list];
      }),
    [ADD_PROJECT]: (state, action) =>
      produce(state, draft => {
        // 데이터를 배열 맨 앞에 넣어줍니다.
        draft.list.unshift(action.payload.project);
      }),
    [DELETE_PROJECT]: (state, action) =>
      produce(state, draft => {
        let idx = draft.list.findIndex(
          p => p.projectId === action.payload.projectId,
        );
        console.log(idx);
        if (idx !== -1) {
          // 배열에서 idx 위치의 요소 1개를 지웁니다.
          draft.list.splice(idx, 1);
        }
      }),
    [EDIT_PROJECT]: (state, action) => produce(state.draft),
  },
  initialState,
);

const actionCreators = {
  setProject,
  addProject,
  deleteProject,
  __postProject,
  __setProject,
  __setOneProject,
  __deleteProject,
};

export { actionCreators };
