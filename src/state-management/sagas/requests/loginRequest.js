import axios from 'axios';

const loginRequest = (payload) => {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, payload);
}

export default loginRequest;