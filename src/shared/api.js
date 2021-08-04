import axios from "axios";

/* == Axios - instance */
const instance = axios.create({
  baseURL: "http://blossomwhale.shop",
  headers: {},
  withCredentials: true,
});

/* == API - project */
export const projectApi = {
  getProject: () => instance.get("/api/projects"),
  getOneProject: projectId => instance.get(`/api/projects/${projectId}`),
  postProject: project => instance.post("/api/projects", project),
  deleteProject: projectId => instance.delete(`/api/projects/${projectId}`),
  putProject: projectId => instance.put(`/api/projects/${projectId}`),
};
/* == API - note */
export const noteApi = {
  getKanbanNotes: () => instance.get("/api/projects/60/kanbans"), // 현재 projectId 60에 해당하는 노트들 고정으로 가져옴
  getNoteDetail: noteId => instance.get(`/api/notes/${noteId}`),
};
