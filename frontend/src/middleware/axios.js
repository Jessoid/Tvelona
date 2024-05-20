import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
});
//middleware proverjajet estj token ili net 
//dlja ljubogo zaprosa proverjajem, estj li v localStorage 4to-to 
axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});

export default axiosInstance;