import axios from './request';
/* 请求 Api */
export const getCount = () => {
  return axios.get('/api/example');
};
