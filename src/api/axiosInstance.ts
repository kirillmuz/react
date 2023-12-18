import axios from 'axios';

export const AxiosInstance = axios.create({
    baseURL: 'https://localhost:7045',
    headers: {"Access-Control-Allow-Origin": "true"}
});
