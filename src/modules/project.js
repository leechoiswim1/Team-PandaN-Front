import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { projectApi } from "../shared/api"; // 필요한 api 함수 불러 올 것
import { configure } from "@testing-library/react";

const SET_PROJECT = "SET_PROJECT";
const SET_DETAIL_PROJECT = "SET_DETAIL_PROJECT";
const ADD_PROJECT = "ADD_PROJECT";
const EDIT_PROJECT = "EDIT_PROJECT";
const DELETE_PROJECT = "DELETE_PROJECT";
const INVITE_PROJECT = "INVITE_PROJECT";
const CHECK_PROJECT_CREWS = "CHECK_PROJECT_CREWS";

const setProject = createAction(SET_PROJECT, project_list => ({
  project_list,
}));

const setDetailProject = createAction(
  SET_PROJECT,
  (projectId, project_detail_list) => ({
    projectId,
    project_detail_list,
  }),
);

const addProject = createAction(ADD_PROJECT, project => ({ project }));

const deleteProject = createAction(DELETE_PROJECT, projectId => ({
  projectId,
}));

const editProject = createAction(EDIT_PROJECT, Project => ({
  Project,
}));

const inviteProject = createAction(INVITE_PROJECT, InviteCode => ({
  InviteCode,
}));

const checkProjectCrews = createAction(
  CHECK_PROJECT_CREWS,
  (crews, projectId) => ({
    crews,
    projectId,
  }),
);

const initialState = {
  list: [],
  detailList: [],
  inviteCodeList: [],
  projectCrews: [],
};

const __setProject =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const data = await projectApi.getProject();

      dispatch(setProject(data.data.projects));
    } catch (e) {
      console.log(e);
    }
  };

const __setDetailProject =
  projectId =>
  async (dispatch, getState, { history }) => {
    try {
      const data = await projectApi.getDetailProject(projectId);
      console.log(data);
      dispatch(setDetailProject(data.data));
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
  (projectId, project) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await projectApi.putProject(projectId, project);
      dispatch(editProject(data));
    } catch (e) {
      console.log(e);
    }
  };

const __inviteProject =
  projectId =>
  async (dispatch, getState, { history }) => {
    try {
      const data = await projectApi.getinviteProject(projectId);
      dispatch(inviteProject(data.data));
    } catch (e) {
      console.log(e);
    }
  };

const __joinProject =
  inviteCode =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await projectApi.postJoinProject(inviteCode);
      dispatch(setProject());
    } catch (e) {
      console.log(e);
    }
  };

const __checkProjectCrews =
  projectId =>
  async (dispatch, getState, { history }) => {
    try {
      console.log(projectId);
      const data = await projectApi.getProjectCrews(projectId);

      dispatch(checkProjectCrews(data.data));
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

    [SET_DETAIL_PROJECT]: (state, action) =>
      produce(state, draft => {
        draft.detailList = [...action.payload.project_detail_list];
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
    [EDIT_PROJECT]: (state, action) =>
      produce(state, draft => {
        // 배열의 몇 번째에 있는 지 찾습니다.
        let idx = draft.list.findIndex(
          p => p.projectId === action.payload.Project.projectId,
        );
        // 해당 위치에 넣어줍니다.
        draft.list[idx] = { ...action.payload.Project };
      }),

    [INVITE_PROJECT]: (state, action) =>
      produce(state, draft => {
        const inviteCode = action.payload.InviteCode;
        console.log(inviteCode);
        draft.inviteCodeList = inviteCode;
      }),

    [CHECK_PROJECT_CREWS]: (state, action) =>
      produce(state, draft => {
        draft.projectCrews = [...action.payload.crews.crews];
        console.log(draft.projectCrews);
      }),
  },

  initialState,
);

const actionCreators = {
  setProject,
  setDetailProject,
  addProject,
  deleteProject,
  editProject,
  inviteProject,
  checkProjectCrews,
  __setDetailProject,
  __postProject,
  __setProject,
  __deleteProject,
  __editProject,
  __inviteProject,
  __joinProject,
  __checkProjectCrews,
};

export { actionCreators };
