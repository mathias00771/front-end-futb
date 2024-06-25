import axios from './axios.js';

export const loginRequest = user =>  axios.post(`/login`,user)
export const logoutRequest = () =>  axios.post(`/logout`)
export const verifyTokenRequest = () =>  axios.post(`/verify`)
