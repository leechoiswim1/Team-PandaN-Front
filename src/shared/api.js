import axios from "axios";

/* == Axios - instance */
const instance = axios.create({
  baseURL: "http://blossomwhale.shop",
  headers: { },
  withCredentials: true,
});

/* == API - project */
export const projectApi = {
  getSomething: () => instance.get("url"),
}
/* == API - note */
export const noteApi = {
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
};
/* == API - comment */
export const commentApi = {
  getCommentList: () => instance.get(""), 
};


