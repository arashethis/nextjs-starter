import axios from 'axios';

const instance = axios.create({
  baseURL: '.',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

// Add a request interceptor
instance.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // 后端返回 data 数据格式: { code: number, data: any, msg: string}
    const { data } = response;
    if (data.code === 0) {
      // code 为 0 表示请求成功，直接返回 data 数据
      return data.data;
    }
    return Promise.reject(data); // code 不为0 返回错误码和错误信息
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default instance;
