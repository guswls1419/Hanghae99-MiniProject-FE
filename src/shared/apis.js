import axios from "axios";

const USER_TOKEN = sessionStorage.getItem("X-AUTH-TOKEN");

const instance = axios.create({
  baseURL: "http://13.124.130.158/",
});

instance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${USER_TOKEN}`;
    return config;
  },
  function (error) {
    console.log("err");
    return Promise.reject(error);
  }
);

export const apis = {
  // 회원가입 요청
  signUp: (userInfo) => instance.post("user/signup", userInfo),
  // 로그인
  login: (data) => instance.post("user/login",  { username: data.username, password: data.password, }),
  // 로그인 체크
  loginCheck: () => instance.get("/api/users/:userUid/validation"),

};

export default apis;