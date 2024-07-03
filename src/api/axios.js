import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://backendfut.onrender.com/api', //https://backendfut.onrender.com/api http://localhost:4000/api
    withCredentials: true, // Permitir el envío de cookies en las solicitudes
});

export default instance;
