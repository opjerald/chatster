import axios from 'axios';

const api = () => {
  const api = axios.create({
    baseURL: 'http://localhost:8000',
    // withCredentials: true,
  });

  return api;
};

export default api;
