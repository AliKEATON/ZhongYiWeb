// src/utils/api.js
import axios from 'axios';

// 使用 process.env 获取环境变量（适用于 Vue CLI / Webpack）
const baseURL = process.env.VUE_APP_API_URL || 'http://localhost:8080';
const apiClient = axios.create({
  baseURL,
  timeout: 5000,
});

// 请求拦截器：自动带上 token
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['token'] = `${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default apiClient;