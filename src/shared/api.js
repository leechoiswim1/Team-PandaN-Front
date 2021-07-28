import axios from "axios";

const instance = axios.create({
  // baseURL: '',
  // baseURL: 'http://localhost:4000', //
  // headers: {
  // 	'content-type': 'application/json;charset=UTF-8',
  // 	accept: 'application/json,',
  // },
  // withCredentials: true,
});

// interceptors
instance.interceptors.request.use(config => {
  return config;
});

// 각 모듈 파일 내 임포트 후: exampleApi.doExample()
export const exampleApi = {
  getSomething: () => instance.get("url"),
};
