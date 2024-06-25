import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://backendfut.onrender.com/api',
    withCredentials: true, // Permitir el envío de cookies en las solicitudes
});

export default instance;
