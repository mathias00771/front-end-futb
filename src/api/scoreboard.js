import axios from './axios.js';

export const updateInformationSB = information =>  axios.post(`/updateinfoscore`,information)
export const getInformationSB = () =>  axios.get(`/scoreboardinfo`)

