import axios from "axios";

/* == Axios - instance */
const instance = axios.create({
  baseURL: "http://blossomwhale.shop",
  headers: {},
  withCredentials: true,
});

/* == API - user */
export const userApi = {
  logout: () => instance.get("/logout"),
  getUserDetail: () => instance.get("/api/users/details"),
}

/* == API - project */
export const projectApi = {
  getProject: () => instance.get("/api/projects"),
  getOneProject: projectId => instance.get(`/api/projects/${projectId}`),
  postProject: project => instance.post("/api/projects", project),
  deleteProject: projectId => instance.delete(`/api/projects/${projectId}`),
  putProject: (projectId, project) =>
    instance.put(`/api/projects/${projectId}`, project),
  getinviteProject: projectId =>
    instance.get(`/api/projects/${projectId}/invites`),
  postJoinProject: inviteCode =>
    instance.post("/api/projects/invites", inviteCode),
  getProjectCrews: projectId =>
    instance.get(`/api/projects/${projectId}/crews`),
};

/* == API - note */
export const noteApi = {
  /* project kanban */
  getKanbanNotes: (projectId) => instance.get(`/api/projects/${projectId}/kanbans`),
  /* project issue */
  getProjectIssue: (projectId) => instance.get(`/api/projects/${projectId}/issues`),
  getProjectMyIssue: (projectId) => instance.get(`/api/projects/${projectId}/mynotes`),
  /* detail */
  getNoteDetail: (noteId) => instance.get(`/api/notes/${noteId}`),
  /* note */
  editNote: (noteId, newNote) => instance.put(`/api/notes/${noteId}`, newNote),
  /* bookmark */
  getBookmark: () => instance.get("/api/notes/mybookmark"),
  addBookmark: (noteId) => instance.post(`/api/notes/${noteId}/bookmark`),
  deleteBookmark: (noteId) => instance.delete(`/api/notes/${noteId}/unbookmark`),
  /* my issue */  
  getMyNote: () => instance.get("/api/notes/mynotes"),
};

/* == API - comment */
export const commentApi = {
  getCommentList: () => instance.get(""), 
};
