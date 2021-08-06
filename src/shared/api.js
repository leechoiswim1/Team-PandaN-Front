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
  getKanbanNotes: (projectId) => instance.get("/api/projects/60/kanbans"), // 현재 projectId 60에 해당하는 노트들 고정으로 가져옴
  getProjectIssueNotes: (projectId) => instance.get(`/api/projects/${projectId}/issues`),
  getNoteDetail: (noteId) => instance.get(`/api/notes/${noteId}`),
  editNote: (noteId, newNote) => instance.put(`/api/notes/${noteId}`, newNote),
  /* bookmark */
  addBookmark: (noteId) => instance.post(`/api/notes/${noteId}/bookmark`),
  deleteBookmark: (noteId) => instance.delete(`/api/notes/${noteId}/unbookmark`),
};
/* == API - comment */
export const commentApi = {
  getCommentList: () => instance.get(""), 
};


