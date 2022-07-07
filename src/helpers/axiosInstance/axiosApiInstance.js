import axios from "axios";
import { loginSuccess, logoutSuccess } from "../../state-management/auth/slice";
import store from "../../state-management/index";
import { refreshTokenRequest } from "../requests/refreshTokenRequest";
const axiosApiInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
});

// Axios send access token in header for every request
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const accessToken = store.getState().auth.token;

    config.headers = {
      Authorization: config.headers.Authorization || `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Axios interceptor for refresh token
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await refreshTokenRequest();
      if (response.status === 403) {
        store.dispatch(logoutSuccess());
        return;
      }
      originalRequest.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
      setTimeout(() => {
        store.dispatch(loginSuccess(response));
      }, 3000);
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
