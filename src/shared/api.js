import axios from "axios";

const instance = axios.create({
  baseURL: "http://blossomwhale.shop/",
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
  getSomething: () => instance.get("url"),
};
