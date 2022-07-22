import axios from "axios";

export const refreshTokenRequest = async () => {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/auth/refresh`, {
    withCredentials: true,
  });
};
