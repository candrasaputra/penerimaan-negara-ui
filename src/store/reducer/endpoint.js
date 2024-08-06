import axios from "axios";
axios.defaults.withCredentials = true; // for all requests

export const axiosBackendInstance = () => axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080/api/'
})

export const ENDPOINT = {
    STATUS_URL: 'auth/status',
    LOGIN_URL: 'auth/login',
    LOGOUT_URL: 'auth/logout',

    DEPOSITE: 'deposite',
}