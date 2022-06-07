import axios from 'axios';
import store from '../../state-management/index'
import { refreshTokenRequest } from '../requests/refreshTokenRequest';
const axiosApiInstance = axios.create({
   withCredentials: true,
   baseURL: process.env.REACT_APP_BASE_URL
  });

axiosApiInstance.interceptors.request.use(
  async config => {
    const accessToken = store.getState().auth.token

    config.headers = { 
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true
    }
    return config;
  },
  error => {
    Promise.reject(error)
});


axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true;
    const { accessToken } = await refreshTokenRequest();            
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    return axiosApiInstance(originalRequest);
  }
  return Promise.reject(error);
});

export default axiosApiInstance;