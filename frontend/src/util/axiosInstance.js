// src/axiosInstance.js
import axios from 'axios';

const isDev = process.env.NODE_ENV === "development";

console.log({
    NODE_ENV: process.env.NODE_ENV,
    isDev,
});

let server_url = "http://localhost:4000/api";
if (!isDev) {
    // server_url = "https://52.15.33.239/api"
    server_url = "http://52.15.33.239:4000/api";
}

const axiosInstance = axios.create({
    baseURL: server_url,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // optional: timeout after 10 seconds
});

export default axiosInstance;