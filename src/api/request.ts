import axios from 'axios';
import TokenProvider from 'utilities/authenticate/TokenProvider';
import { apiLogger } from 'utilities/logger';

const DEFAULT_ERROR_MESSAGE = 'Call api error';

const request = axios.create({
    baseURL: 'https://project.backimthang100.repl.co/',
    timeout: 8000,
    headers: { Accept: '*/*' },
});
request.interceptors.request.use(
    async (config: any) => {
        const token = TokenProvider.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: any) => {
        // Do something with api error
        apiLogger('api error', 'background: red; color: #fff', error.response);
        return Promise.reject(error);
    },
);

request.interceptors.response.use(
    (response: any) => response.data,
    async (error: any) => {
        // Do something with response error
        const errorMessage = error.response.data.message;
        error.message = errorMessage || DEFAULT_ERROR_MESSAGE;
        if (error.response.data.status === -1) {
            error.message = 'Something went wrong!';
        }
        return Promise.reject(error.message);
    },
);

export default request;
