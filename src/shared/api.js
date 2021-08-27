import axios from "axios";

/* == Axios - instance */
const instance = axios.create({
  baseURL: "https://web27.shop/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  },
});

/* == Axios - interceptor for sending accessToken */
instance.interceptors.request.use((config) => {
  const TOKEN = document.cookie.split("=")[1];
  config.headers["TOKEN"] = TOKEN;
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.headers["Access-Control-Allow-Headers"] = "Content-Type";
  config.headers["Content-Type"] = "application/json";
  return config;
});

/* == API - project */
export const projectApi = {
  getProject: () => instance.get("/api/projects"),
  getOneProject: (projectId) => instance.get(`/api/projects/${projectId}`),
  getSideProejct: () => instance.get("/api/projects/sidebar"),
  postProject: (project) => instance.post("/api/projects", project),
  deleteProject: (projectId) => instance.delete(`/api/projects/${projectId}`),
  leaveProject: (projectId) => instance.put(`/api/projects/leave/${projectId}`),
  putProject: (projectId, project) => instance.put(`/api/projects/${projectId}`, project),
  getinviteProject: (projectId) => instance.get(`/api/projects/${projectId}/invites`),
  postJoinProject: (inviteCode) => instance.post("/api/projects/invites", inviteCode),
  getProjectCrews: (projectId) => instance.get(`/api/projects/${projectId}/crews`),
  postGuideProject: () => instance.post("/api/projects/guide"),
};

/* == API - user */
export const userApi = {
  login: (authcode) => instance.get(`/user/kakao/callback?code=${authcode}`),
  logout: () => instance.get("/logout"),
  getUserDetail: () => instance.get("/api/user/detail"),
};

/* == API - note */
export const noteApi = {
  /* project kanban */
  getKanbanNotes: (projectId) => instance.get(`/api/projects/${projectId}/kanbans`),
  editKanbanStep: (noteId, position) => instance.put(`/api/notes/${noteId}`, position),
  /* project issue */
  getProjectIssue: (projectId, _page, size) => instance.get(`/api/projects/${projectId}/issues?page=${_page}&size=${size}`),
  getProjectMyNotes: (projectId, _page, size) => instance.get(`/api/projects/${projectId}/mynotes?page=${_page}&size=${size}`),
  /* detail */
  getNoteDetail: (noteId) => instance.get(`/api/notes/${noteId}`),
  /* note edit mode ; lock manager */
  checkEditmodeLocked: (noteId) => instance.get(`/api/notes/is-lock/${noteId}`),
  sendLockSignal: (noteId) => instance.post(`/api/notes/start-lock-manager/${noteId}`),
  sendWritingSignal: (noteId) => instance.post(`/api/notes/writing/${noteId}`),
  /* note */
  addNote: (noteId, newNote) => instance.post(`/api/notes/${noteId}`, newNote),
  editNote: (noteId, newNote) => instance.put(`/api/notes/details/${noteId}`, newNote),
  deleteNote: (noteId) => instance.delete(`/api/notes/${noteId}`),
  /* bookmark */
  getBookmark: (_page, size) => instance.get(`/api/notes/mybookmarks?page=${_page}&size=${size}`),
  addBookmark: (noteId) => instance.post(`/api/notes/${noteId}/bookmark`),
  deleteBookmark: (noteId) => instance.post(`/api/notes/${noteId}/unbookmark`),
  /* my issue */
  getMyNotes: (_page, size) => instance.get(`/api/notes/mynotes?page=${_page}&size=${size}`),
};

/* == API - comment */
export const commentApi = {
  getCommentList: (noteId) => instance.get(`/api/comments/${noteId}`),
  postComment: (noteId, comment) => instance.post(`/api/comments/${noteId}`, comment),
  deleteComment: (commentId) => instance.delete(`/api/comments/${commentId}`),
  putComment: (commentId, comment) => instance.put(`/api/comments/${commentId}`, comment),
};

/* == API - search */
export const searchApi = {
  getSearchList: (keyword) => instance.get(`/api/notes/search?keyword=${keyword}`),
  getSearchAll: (keyword) => instance.get(`/api/notes/search?keyword=${keyword}`),
  getSearchBookmark: (keyword) => instance.get(`/api/notes/search/bookmarks?keyword=${keyword}`),
  getSearchMynote: (keyword) => instance.get(`/api/notes/search/mynotes?keyword=${keyword}`),
};

/* == API - file */
export const fileApi = {
  // addFiles: (noteId, files) => instance.post(`/api/files/${noteId}`, files),
  deleteFile: (fileId) => instance.delete(`/api/files/${fileId}`),
};
