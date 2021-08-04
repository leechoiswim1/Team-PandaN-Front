import axios from "axios";

const instance = axios.create({
  baseURL: "http://blossomwhale.shop",
  // headers: {
  // 	'content-type': 'application/json;charset=UTF-8',
  // 	accept: 'application/json,',
  // },
  withCredentials: true,
});

// interceptors
instance.interceptors.request.use(config => {
  return config;
});

export const projectApi = {
  getProject: () => instance.get("/api/projects"),
  getOneProject: projectId => instance.get(`/api/projects/${projectId}`),
  postProject: project => instance.post("/api/projects", project),
  deleteProject: projectId => instance.delete(`/api/projects/${projectId}`),
  putProject: projectId => instance.put(`/api/projects/${projectId}`),
};
