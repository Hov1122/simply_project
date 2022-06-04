import axios from 'axios';

const logOutRequest = (payload) => {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/auth/logout`, payload);
}

export default logOutRequest;